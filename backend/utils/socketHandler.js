const activeUsers = new Map();
const workspaceUsers = new Map();

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    const { token, userId, username, role } = socket.handshake.auth;
    
    console.log(`✅ User connected: ${username} (${role}) - Socket: ${socket.id}`);
    
    // Store user info
    socket.userId = userId;
    socket.username = username;
    socket.role = role;
    
    // Add to active users
    activeUsers.set(userId, {
      socketId: socket.id,
      username,
      role,
      userId
    });

    // Handle workspace join
    socket.on('join_workspace', (workspaceId) => {
      socket.join(`workspace_${workspaceId}`);
      
      // Add to workspace users
      if (!workspaceUsers.has(workspaceId)) {
        workspaceUsers.set(workspaceId, new Set());
      }
      workspaceUsers.get(workspaceId).add(userId);
      
      // Get all users in workspace
      const usersInWorkspace = Array.from(workspaceUsers.get(workspaceId) || [])
        .map(uid => activeUsers.get(uid))
        .filter(Boolean);
      
      // Send updated user list to all in workspace
      io.to(`workspace_${workspaceId}`).emit('users_update', usersInWorkspace);
      
      // Notify others that user joined
      socket.to(`workspace_${workspaceId}`).emit('user_joined', {
        userId,
        username,
        role
      });
      
      console.log(`👥 ${username} joined workspace ${workspaceId}`);
    });

    // Handle messages
    socket.on('send_message', (data) => {
      const { workspaceId, content, type = 'text' } = data;
      
      console.log(`💬 Message from ${username}: ${content}`);
      
      const message = {
        _id: `msg_${Date.now()}_${Math.random()}`,
        content,
        type,
        user: {
          _id: userId,
          username,
          role
        },
        createdAt: new Date().toISOString()
      };
      
      // Broadcast to all users in workspace (including sender)
      io.to(`workspace_${workspaceId}`).emit('new_message', message);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${username}`);
      
      // Remove from active users
      activeUsers.delete(userId);
      
      // Remove from workspace users and notify others
      workspaceUsers.forEach((users, workspaceId) => {
        if (users.has(userId)) {
          users.delete(userId);
          
          // Update user list for remaining users
          const remainingUsers = Array.from(users)
            .map(uid => activeUsers.get(uid))
            .filter(Boolean);
          
          io.to(`workspace_${workspaceId}`).emit('users_update', remainingUsers);
          socket.to(`workspace_${workspaceId}`).emit('user_left', { userId });
        }
      });
    });
  });
};

module.exports = socketHandler;
