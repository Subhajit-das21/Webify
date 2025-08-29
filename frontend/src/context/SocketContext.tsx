import React, { createContext, useContext, ReactNode } from 'react';

interface SocketContextType {
  socket: any;
  isConnected: boolean;
  sendMessage: (message: any) => void;
  joinRoom: (roomId: string) => void;
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
  const socket = null; // Will be implemented with actual socket.io
  const isConnected = true; // Mock connection

  const sendMessage = (message: any) => {
    console.log('Sending message:', message);
  };

  const joinRoom = (roomId: string) => {
    console.log('Joining room:', roomId);
  };

  return (
    <SocketContext.Provider value={{ socket, isConnected, sendMessage, joinRoom }}>
      {children}
    </SocketContext.Provider>
  );
};
