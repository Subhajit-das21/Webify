import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Avatar,
  IconButton,
  InputAdornment,
  Divider,
  Badge,
  Button,
  Chip,
  Alert,
} from '@mui/material';
import { Send, MoreVert, ArrowForward, Circle } from '@mui/icons-material';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

const ChatPanel: React.FC = () => {
  const [message, setMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { 
    messages, 
    onlineUsers, 
    notifications, 
    userPermissions,
    sendMessage, 
    isConnected,
    markNotificationRead,
    clearNotifications
  } = useSocket();
  const { user } = useAuth();
  
  // Mock workspace ID - in real app, get from workspace context
  const currentWorkspaceId = '67234567890abcdef1234567';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      sendMessage(currentWorkspaceId, message);
      setMessage('');
    }
  };

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiMessage.trim() && isConnected) {
      sendMessage(currentWorkspaceId, `@AI ${aiMessage}`, 'ai');
      setAiMessage('');
    }
  };

  const canSendMessages = userPermissions.includes('send_message');
  const connectionStatus = isConnected ? 'Connected' : 'Connecting...';
  const statusColor = isConnected ? 'success' : 'warning';

  return (
    <Box sx={{ 
      width: 300, 
      bgcolor: 'white',
      borderLeft: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Chat Header with Status */}
      <Box sx={{ 
        p: 1.5, 
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 16 }}>
          Chat
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            icon={<Circle sx={{ fontSize: 8 }} />}
            label={connectionStatus}
            size="small"
            color={statusColor}
            variant="outlined"
            sx={{ fontSize: 10, height: 20 }}
          />
          <Badge
            badgeContent={notifications.length}
            color="error"
            sx={{ mr: 1 }}
          >
            <Typography variant="caption" color="text.secondary">
              {onlineUsers.length} online
            </Typography>
          </Badge>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>
      </Box>

      {/* Notifications Panel */}
      {notifications.length > 0 && (
        <Box sx={{ p: 1, borderBottom: '1px solid #e2e8f0', maxHeight: 120, overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Notifications ({notifications.length})
            </Typography>
            <Button size="small" onClick={clearNotifications} sx={{ minWidth: 'auto', p: 0.5 }}>
              Clear
            </Button>
          </Box>
          {notifications.slice(0, 3).map((notification, index) => (
            <Alert
              key={index}
              severity={notification.type === 'error' ? 'error' : 'info'}
              onClose={() => markNotificationRead(index)}
              sx={{ mb: 0.5, fontSize: 10, p: 0.5 }}
            >
              <Typography variant="caption" sx={{ fontSize: 10 }}>
                <strong>{notification.title}:</strong> {notification.message}
              </Typography>
            </Alert>
          ))}
        </Box>
      )}

      {/* Online Users */}
      <Box sx={{ p: 1, borderBottom: '1px solid #e2e8f0' }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
          Online ({onlineUsers.length})
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, overflowX: 'auto' }}>
          {onlineUsers.map((onlineUser) => (
            <Box key={onlineUser.userId} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
              <Avatar
                sx={{ 
                  width: 20, 
                  height: 20, 
                  fontSize: 10, 
                  bgcolor: onlineUser.role === 'admin' ? '#f59e0b' : '#3b82f6' 
                }}
                title={`${onlineUser.username} (${onlineUser.role})`}
              >
                {onlineUser.username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="caption" sx={{ fontSize: 8, textAlign: 'center' }}>
                {onlineUser.role}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Permission Warning */}
      {!canSendMessages && (
        <Box sx={{ p: 1, bgcolor: '#fef3c7', borderBottom: '1px solid #e2e8f0' }}>
          <Typography variant="caption" color="warning.main" sx={{ fontSize: 11 }}>
            ⚠️ You don't have permission to send messages
          </Typography>
        </Box>
      )}

      {/* Messages */}
      <Box sx={{ flexGrow: 1, p: 1.5, overflow: 'auto', maxHeight: 280 }}>
        {messages.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              {isConnected ? 'No messages yet. Start the conversation!' : 'Connecting to chat...'}
            </Typography>
          </Box>
        ) : (
          messages.map((msg) => (
            <Box key={msg._id} sx={{ display: 'flex', mb: 2 }}>
              <Avatar sx={{ 
                width: 28, 
                height: 28, 
                mr: 1.5, 
                fontSize: 12, 
                bgcolor: msg.user.role === 'admin' ? '#f59e0b' : '#3b82f6' 
              }}>
                {msg.user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.3, flexWrap: 'wrap' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mr: 1, fontSize: 12 }}>
                    {msg.user.username}
                  </Typography>
                  <Chip
                    label={msg.user.role}
                    size="small"
                    sx={{ 
                      height: 14, 
                      fontSize: 8, 
                      mr: 0.5,
                      bgcolor: msg.user.role === 'admin' ? '#fef3c7' : '#dbeafe',
                      color: msg.user.role === 'admin' ? '#f59e0b' : '#3b82f6'
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </Typography>
                  {msg.type === 'ai' && (
                    <Typography variant="caption" sx={{ 
                      ml: 0.5, 
                      px: 0.5, 
                      py: 0.1, 
                      bgcolor: '#f0f9ff', 
                      color: '#3b82f6',
                      borderRadius: 0.5,
                      fontSize: 9
                    }}>
                      AI
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12, wordBreak: 'break-word' }}>
                  {msg.content}
                </Typography>
              </Box>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Box sx={{ p: 1.5, borderTop: '1px solid #e2e8f0' }}>
        <form onSubmit={handleSendMessage}>
          <TextField
            fullWidth
            placeholder={
              !isConnected 
                ? "Connecting..." 
                : !canSendMessages 
                ? "No permission to send messages" 
                : "Type a message..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!isConnected || !canSendMessages}
            size="small"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                bgcolor: (isConnected && canSendMessages) ? '#f8fafc' : '#f1f5f9',
                fontSize: 13,
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    size="small" 
                    sx={{ color: '#3b82f6' }}
                    type="submit"
                    disabled={!isConnected || !message.trim() || !canSendMessages}
                  >
                    <Send fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>

      <Divider />

      {/* AI Assistant */}
      <Box sx={{ p: 1.5 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.5
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 15 }}>
            AI Assistant
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🤖
          </Typography>
        </Box>
        
        <form onSubmit={handleSendAiMessage}>
          <TextField
            fullWidth
            placeholder={
              !isConnected 
                ? "Offline" 
                : !canSendMessages 
                ? "No permission" 
                : "Ask AI anything..."
            }
            value={aiMessage}
            onChange={(e) => setAiMessage(e.target.value)}
            disabled={!isConnected || !canSendMessages}
            size="small"
            sx={{ 
              mb: 1.5,
              '& .MuiOutlinedInput-root': {
                bgcolor: (isConnected && canSendMessages) ? '#f8fafc' : '#f1f5f9',
                fontSize: 13,
              }
            }}
          />
        </form>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: '#f0f9ff',
          p: 1.5,
          borderRadius: 1,
          border: '1px solid #bfdbfe'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 20, height: 20, mr: 1, bgcolor: '#3b82f6' }}>
              🤖
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 13 }}>
              AI Assistant
            </Typography>
          </Box>
          <IconButton 
            size="small" 
            sx={{ color: '#3b82f6' }}
            onClick={handleSendAiMessage}
            disabled={!isConnected || !aiMessage.trim() || !canSendMessages}
          >
            <ArrowForward fontSize="small" />
          </IconButton>
        </Box>

        {/* User Info */}
        <Box sx={{ mt: 1, p: 1, bgcolor: '#f8fafc', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
            You: {user?.username} ({user?.role})
            {canSendMessages ? ' ✅ Can chat' : ' ❌ View only'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPanel;
