const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Chat = require('../models/Chat');
const CodeFile = require('../models/CodeFile');

const socketHandler = (io) => {
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user._id.toString();
      socket.user = user;
      next();
    } catch (error) {
      console.error('Socket authentication error:', error);
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket) => {
    console.log(`✅ User ${socket.user.username} connected`);
    
    // Update user online status
    await User.findByIdAndUpdate(socket.userId, {
      isOnline: true,
      socketId: socket.id,
      lastSeen: new Date()
    });

    // Join user to their workspaces
    const user = await User.findById(socket.userId).populate('workspaces.workspace');
    user.workspaces.forEach(workspace => {
      socket.join(`workspace_${workspace.workspace._id}`);
    });

    // Handle workspace join
    socket.on('join_workspace', async (workspaceId) => {
      socket.join(`workspace_${workspaceId}`);
      socket.to(`workspace_${workspaceId}`).emit('user_joined', {
        userId: socket.userId,
        username: socket.user.username,
        avatar: socket.user.avatar
      });
    });

    // Handle chat messages
    socket.on('send_message', async (data) => {
      try {
        const { workspaceId, content, type = 'text', mentions = [] } = data;
        
        let chat = await Chat.findOne({ workspace: workspaceId, channel: 'general' });
        if (!chat) {
          chat = new Chat({ workspace: workspaceId, channel: 'general' });
        }

        const message = {
          user: socket.userId,
          content,
          type,
          mentions,
          createdAt: new Date()
        };

        chat.messages.push(message);
        await chat.save();
        
        await chat.populate('messages.user', 'username avatar');

        // Emit to workspace members
        io.to(`workspace_${workspaceId}`).emit('new_message', {
          ...message,
          user: {
            _id: socket.userId,
            username: socket.user.username,
            avatar: socket.user.avatar
          }
        });
      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on('typing_start', (data) => {
      socket.to(`workspace_${data.workspaceId}`).emit('user_typing', {
        userId: socket.userId,
        username: socket.user.username,
        isTyping: true
      });
    });

    socket.on('typing_stop', (data) => {
      socket.to(`workspace_${data.workspaceId}`).emit('user_typing', {
        userId: socket.userId,
        username: socket.user.username,
        isTyping: false
      });
    });

    // Handle code collaboration
    socket.on('join_file', (fileId) => {
      socket.join(`file_${fileId}`);
      socket.to(`file_${fileId}`).emit('collaborator_joined', {
        userId: socket.userId,
        username: socket.user.username,
        avatar: socket.user.avatar
      });
    });

    socket.on('code_change', async (data) => {
      try {
        const { fileId, content, delta } = data;
        
        // Update file content
        await CodeFile.findByIdAndUpdate(fileId, { content });
        
        // Broadcast to other collaborators
        socket.to(`file_${fileId}`).emit('code_update', {
          content,
          delta,
          userId: socket.userId,
          timestamp: Date.now()
        });
      } catch (error) {
        console.error('Code change error:', error);
        socket.emit('error', { message: 'Failed to sync code changes' });
      }
    });

    socket.on('cursor_move', (data) => {
      const { fileId, cursor, selection } = data;
      socket.to(`file_${fileId}`).emit('cursor_update', {
        userId: socket.userId,
        username: socket.user.username,
        cursor,
        selection,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}` // Random color
      });
    });

    // Handle video call signaling
    socket.on('video_call_offer', (data) => {
      socket.to(`workspace_${data.workspaceId}`).emit('video_call_offer', {
        from: socket.userId,
        fromUsername: socket.user.username,
        offer: data.offer
      });
    });

    socket.on('video_call_answer', (data) => {
      socket.to(`workspace_${data.workspaceId}`).emit('video_call_answer', {
        from: socket.userId,
        answer: data.answer
      });
    });

    socket.on('ice_candidate', (data) => {
      socket.to(`workspace_${data.workspaceId}`).emit('ice_candidate', {
        from: socket.userId,
        candidate: data.candidate
      });
    });

    // Handle task updates
    socket.on('task_update', (data) => {
      socket.to(`workspace_${data.workspaceId}`).emit('task_updated', data);
    });

    // Handle file sharing
    socket.on('file_upload', (data) => {
      socket.to(`workspace_${data.workspaceId}`).emit('file_uploaded', data);
    });

    // Handle disconnection
    socket.on('disconnect', async () => {
      console.log(`❌ User ${socket.user.username} disconnected`);
      
      // Update user offline status
      await User.findByIdAndUpdate(socket.userId, {
        isOnline: false,
        lastSeen: new Date(),
        socketId: null
      });

      // Notify workspace members
      const user = await User.findById(socket.userId).populate('workspaces.workspace');
      user.workspaces.forEach(workspace => {
        socket.to(`workspace_${workspace.workspace._id}`).emit('user_left', {
          userId: socket.userId,
          username: socket.user.username
        });
      });
    });
  });
};

module.exports = socketHandler;
