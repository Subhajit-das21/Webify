import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface Message {
  _id: string;
  content: string;
  type: string;
  user: {
    _id: string;
    username: string;
    avatar: string;
    email: string;
    role: string;
  };
  createdAt: string;
}

interface OnlineUser {
  userId: string;
  username: string;
  avatar: string;
  email: string;
  role: string;
  socketId: string;
}

interface Notification {
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  workspaceId?: string;
  from?: {
    userId: string;
    username: string;
    avatar: string;
  };
}

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  messages: Message[];
  onlineUsers: OnlineUser[];
  notifications: Notification[];
  userPermissions: string[];
  sendMessage: (workspaceId: string, content: string, type?: string) => void;
  joinWorkspace: (workspaceId: string) => void;
  startTyping: (workspaceId: string) => void;
  stopTyping: (workspaceId: string) => void;
  markNotificationRead: (index: number) => void;
  clearNotifications: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('🔌 Connecting to socket server...');
      
      const newSocket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
        auth: {
          token: localStorage.getItem('token')
        },
        transports: ['websocket', 'polling'],
        timeout: 20000,
        forceNew: true
      });

      // Connection events
      newSocket.on('connect', () => {
        setIsConnected(true);
        console.log('✅ Connected to server with ID:', newSocket.id);
      });

      newSocket.on('disconnect', (reason) => {
        setIsConnected(false);
        console.log('❌ Disconnected from server:', reason);
      });

      newSocket.on('connect_error', (error) => {
        console.error('🔌 Connection error:', error.message);
        setIsConnected(false);
      });

      newSocket.on('connection_success', (data) => {
        console.log('🎉 Connection success:', data);
        setUserPermissions(data.permissions || []);
      });

      // Message events
      newSocket.on('new_message', (message: Message) => {
        console.log('📨 New message received:', message);
        setMessages(prev => {
          // Prevent duplicate messages
          const exists = prev.find(m => m._id === message._id);
          if (exists) return prev;
          return [...prev, message];
        });
      });

      // Notification events
      newSocket.on('notification', (notification: Notification) => {
        console.log('🔔 Notification received:', notification);
        setNotifications(prev => [notification, ...prev].slice(0, 50)); // Keep last 50
        
        // Show browser notification if supported
        if (Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: notification.from?.avatar || '/favicon.ico'
          });
        }
      });

      // User events
      newSocket.on('user_joined_workspace', (data) => {
        console.log('👋 User joined:', data.username);
        setNotifications(prev => [{
          type: 'user_joined',
          title: 'User Joined',
          message: `${data.username} (${data.role}) joined the workspace`,
          timestamp: new Date(),
          workspaceId: data.workspaceId
        }, ...prev].slice(0, 50));
      });

      newSocket.on('user_left_workspace', (data) => {
        console.log('👋 User left:', data.username);
        setNotifications(prev => [{
          type: 'user_left',
          title: 'User Left',
          message: `${data.username} left the workspace`,
          timestamp: new Date()
        }, ...prev].slice(0, 50));
      });

      newSocket.on('workspace_users_update', (data) => {
        console.log('👥 Users in workspace:', data.users);
        setOnlineUsers(data.users);
      });

      // Typing events
      newSocket.on('user_typing', (data) => {
        console.log(`⌨️ ${data.username} is ${data.isTyping ? 'typing' : 'not typing'}`);
      });

      // Task events
      newSocket.on('task_updated', (data) => {
        console.log('📋 Task updated:', data);
        setNotifications(prev => [{
          type: 'task_update',
          title: 'Task Updated',
          message: `${data.updatedBy.username} updated a task`,
          timestamp: new Date()
        }, ...prev].slice(0, 50));
      });

      // Error handling
      newSocket.on('error', (error) => {
        console.error('❌ Socket error:', error);
        setNotifications(prev => [{
          type: 'error',
          title: 'Error',
          message: error.message || 'An error occurred',
          timestamp: new Date()
        }, ...prev].slice(0, 50));
      });

      // Heartbeat
      newSocket.on('heartbeat', (data) => {
        console.log('💓 Heartbeat:', data);
      });

      setSocket(newSocket);

      return () => {
        console.log('🔌 Disconnecting socket...');
        newSocket.close();
      };
    }
  }, [user]);

  // Request notification permission on mount
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const sendMessage = (workspaceId: string, content: string, type: string = 'text') => {
    if (socket && content.trim() && isConnected) {
      console.log('📤 Sending message:', { workspaceId, content, type });
      socket.emit('send_message', {
        workspaceId,
        content: content.trim(),
        type,
        mentions: [] // You can implement @mentions logic here
      });
    } else {
      console.warn('Cannot send message: socket not connected or content empty');
    }
  };

  const joinWorkspace = (workspaceId: string) => {
    if (socket && isConnected) {
      console.log('🏢 Joining workspace:', workspaceId);
      socket.emit('join_workspace', workspaceId);
    }
  };

  const startTyping = (workspaceId: string) => {
    if (socket && isConnected) {
      socket.emit('typing_start', { workspaceId });
    }
  };

  const stopTyping = (workspaceId: string) => {
    if (socket && isConnected) {
      socket.emit('typing_stop', { workspaceId });
    }
  };

  const markNotificationRead = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      messages,
      onlineUsers,
      notifications,
      userPermissions,
      sendMessage,
      joinWorkspace,
      startTyping,
      stopTyping,
      markNotificationRead,
      clearNotifications
    }}>
      {children}
    </SocketContext.Provider>
  );
};
