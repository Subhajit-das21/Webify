import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Avatar,
  IconButton,
  InputAdornment,
  Chip,
  Badge,
} from '@mui/material';
import {
  Send,
  MoreVert,
  Circle,
  ArrowForward,
} from '@mui/icons-material';

interface Message {
  _id: string;
  content: string;
  type: string;
  user: {
    _id: string;
    username: string;
    role: string;
  };
  createdAt: string;
}

interface OnlineUser {
  userId: string;
  username: string;
  role: string;
}

interface User {
  _id: string;
  username: string;
  role: string;
}

const ChatPanel: React.FC = () => {
  const [message, setMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [messages] = useState<Message[]>([
    {
      _id: '1',
      content: 'Welcome to the team chat!',
      type: 'text',
      user: { _id: '1', username: 'Demo User', role: 'admin' },
      createdAt: new Date().toISOString()
    }
  ]);
  const [onlineUsers] = useState<OnlineUser[]>([
    { userId: '1', username: 'Demo User', role: 'admin' },
    { userId: '2', username: 'Test Member', role: 'member' }
  ]);
  const [isConnected] = useState(true);
  const [canSendMessages] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const user: User = {
    _id: 'current',
    username: 'Current User',
    role: 'member'
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isConnected && canSendMessages) {
      // In real app, would send via socket
      setMessage('');
    }
  };

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiMessage.trim() && isConnected && canSendMessages) {
      // In real app, would send to AI service
      setAiMessage('');
    }
  };

  return (
    <Box sx={{ 
      width: 320, 
      background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid rgba(59,130,246,0.1)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.2), -8px 0 32px rgba(59,130,246,0.1)'
    }}>
      {/* Enhanced Chat Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid rgba(59,130,246,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(147,197,253,0.05))'
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 700, 
          fontSize: 18,
          background: 'linear-gradient(45deg, #1f2937, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          💬 Team Chat
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            icon={<Circle sx={{ fontSize: 8 }} />}
            label={isConnected ? 'Live' : 'Connecting'}
            size="small"
            sx={{
              background: isConnected 
                ? 'linear-gradient(45deg, #10b981, #059669)' 
                : 'linear-gradient(45deg, #f59e0b, #d97706)',
              color: 'white',
              fontWeight: 600,
              fontSize: 11,
              height: 24,
              boxShadow: isConnected 
                ? '0 2px 8px rgba(16,185,129,0.4)' 
                : '0 2px 8px rgba(245,158,11,0.4)'
            }}
          />
          <IconButton size="small" sx={{ 
            background: 'rgba(59,130,246,0.1)',
            '&:hover': { background: 'rgba(59,130,246,0.2)' }
          }}>
            <MoreVert />
          </IconButton>
        </Box>
      </Box>

      {/* Enhanced Online Users Section */}
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid rgba(59,130,246,0.1)',
        background: 'linear-gradient(135deg, rgba(248,250,252,0.8), rgba(255,255,255,0.4))'
      }}>
        <Typography variant="caption" sx={{ 
          mb: 1.5, 
          display: 'block',
          fontWeight: 700,
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Online ({onlineUsers.length + 1})
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          {/* Current user with special styling */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ 
              width: 32, 
              height: 32, 
              fontSize: 12,
              background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
              border: '3px solid #10b981',
              boxShadow: '0 0 0 2px rgba(16,185,129,0.3), 0 4px 12px rgba(139,92,246,0.4)',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#10b981',
                border: '2px solid white'
              }
            }}>
              {user?.username?.charAt(0) || 'Y'}
            </Avatar>
            <Typography variant="caption" sx={{ 
              fontSize: 9, 
              fontWeight: 700,
              color: '#8b5cf6',
              mt: 0.5
            }}>
              You
            </Typography>
          </Box>
          
          {/* Other users */}
          {onlineUsers.slice(0, 5).map((onlineUser, index) => (
            <Box key={onlineUser.userId} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ 
                width: 32, 
                height: 32, 
                fontSize: 12,
                background: `linear-gradient(45deg, ${
                  onlineUser.role === 'admin' ? '#f59e0b, #d97706' : '#3b82f6, #2563eb'
                })`,
                boxShadow: `0 4px 12px rgba(${
                  onlineUser.role === 'admin' ? '245,158,11' : '59,130,246'
                },0.4)`,
                border: '2px solid rgba(255,255,255,0.8)'
              }}>
                {onlineUser.username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="caption" sx={{ 
                fontSize: 9, 
                fontWeight: 600,
                color: onlineUser.role === 'admin' ? '#d97706' : '#3b82f6',
                mt: 0.5
              }}>
                {onlineUser.username.length > 6 ? 
                  onlineUser.username.substring(0, 6) + '...' : 
                  onlineUser.username}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Enhanced Messages Area */}
      <Box sx={{ 
        flexGrow: 1, 
        p: 2, 
        overflow: 'auto', 
        maxHeight: 400,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.4), rgba(248,250,252,0.6))'
      }}>
        {messages.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 6,
            background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(147,197,253,0.05))',
            borderRadius: '16px',
            border: '2px dashed rgba(59,130,246,0.2)'
          }}>
            <Typography variant="body2" sx={{ 
              color: '#64748b',
              fontWeight: 600,
              fontSize: 16,
              mb: 1
            }}>
              {isConnected ? '🎉 Ready to chat!' : '⏳ Connecting...'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Start your conversation here
            </Typography>
          </Box>
        ) : (
          messages.map((msg) => (
            <Box key={msg._id} sx={{ 
              display: 'flex', 
              mb: 3,
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(10px)',
              p: 2,
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(59,130,246,0.15)',
              }
            }}>
              <Avatar sx={{ 
                width: 36, 
                height: 36, 
                mr: 2, 
                fontSize: 14,
                background: `linear-gradient(45deg, ${
                  msg.user.role === 'admin' ? '#f59e0b, #d97706' : '#3b82f6, #2563eb'
                })`,
                boxShadow: `0 4px 12px rgba(${
                  msg.user.role === 'admin' ? '245,158,11' : '59,130,246'
                },0.4)`
              }}>
                {msg.user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 14 }}>
                    {msg.user.username}
                  </Typography>
                  <Chip
                    label={msg.user.role}
                    size="small"
                    sx={{ 
                      height: 18, 
                      fontSize: 9,
                      fontWeight: 700,
                      background: `linear-gradient(45deg, ${
                        msg.user.role === 'admin' ? 
                        'rgba(245,158,11,0.1), rgba(217,119,6,0.1)' : 
                        'rgba(59,130,246,0.1), rgba(37,99,235,0.1)'
                      })`,
                      color: msg.user.role === 'admin' ? '#d97706' : '#2563eb',
                      border: `1px solid ${msg.user.role === 'admin' ? '#f59e0b' : '#3b82f6'}`
                    }}
                  />
                  <Typography variant="caption" sx={{ 
                    color: '#94a3b8',
                    fontSize: 11,
                    fontWeight: 500
                  }}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ 
                  fontSize: 14, 
                  wordBreak: 'break-word',
                  lineHeight: 1.6,
                  color: '#374151'
                }}>
                  {msg.content}
                </Typography>
              </Box>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Enhanced Message Input */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid rgba(59,130,246,0.1)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,250,252,0.8))',
        backdropFilter: 'blur(10px)'
      }}>
        <form onSubmit={handleSendMessage}>
          <TextField
            fullWidth
            placeholder={
              !isConnected ? "Connecting..." : 
              !canSendMessages ? "View only mode" : 
              "💭 Type your message..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!isConnected || !canSendMessages}
            size="small"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '25px',
                fontSize: 14,
                border: '2px solid rgba(59,130,246,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255,255,255,0.9)',
                  borderColor: 'rgba(59,130,246,0.3)',
                },
                '&.Mui-focused': {
                  background: 'white',
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 0 4px rgba(59,130,246,0.1)'
                },
                '& fieldset': { border: 'none' },
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    size="small" 
                    type="submit"
                    disabled={!isConnected || !message.trim() || !canSendMessages}
                    sx={{ 
                      background: message.trim() && isConnected && canSendMessages ? 
                        'linear-gradient(45deg, #3b82f6, #2563eb)' : 
                        'rgba(156,163,175,0.3)',
                      color: 'white',
                      width: 32,
                      height: 32,
                      boxShadow: message.trim() && isConnected && canSendMessages ? 
                        '0 4px 12px rgba(59,130,246,0.4)' : 'none',
                      '&:hover': {
                        background: message.trim() && isConnected && canSendMessages ? 
                          'linear-gradient(45deg, #2563eb, #1d4ed8)' : 
                          'rgba(156,163,175,0.4)',
                        transform: message.trim() && isConnected && canSendMessages ? 
                          'scale(1.1)' : 'none'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Send sx={{ fontSize: 16 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mt: 1.5,
          px: 1
        }}>
          <Typography variant="caption" sx={{ 
            color: '#94a3b8',
            fontSize: 11,
            fontWeight: 500
          }}>
            Press Enter to send • {isConnected ? '🟢 Connected' : '🟡 Connecting'}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 0.5,
            alignItems: 'center'
          }}>
            <Typography variant="caption" sx={{ 
              color: '#64748b',
              fontSize: 10
            }}>
              {onlineUsers.length + 1} online
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Enhanced AI Assistant Section */}
      <Box sx={{ 
        p: 2,
        background: 'linear-gradient(135deg, rgba(139,92,246,0.05), rgba(124,58,237,0.05))',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(139,92,246,0.1)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 700, 
            fontSize: 16,
            background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🤖 AI Assistant
          </Typography>
          <Typography variant="body2" sx={{ 
            color: '#8b5cf6',
            fontSize: 12,
            fontWeight: 600
          }}>
            Beta
          </Typography>
        </Box>
        
        <form onSubmit={handleSendAiMessage}>
          <TextField
            fullWidth
            placeholder={
              !isConnected ? "Offline" : 
              !canSendMessages ? "Access denied" : 
              "✨ Ask AI anything..."
            }
            value={aiMessage}
            onChange={(e) => setAiMessage(e.target.value)}
            disabled={!isConnected || !canSendMessages}
            size="small"
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                fontSize: 13,
                border: '2px solid rgba(139,92,246,0.2)',
                '&:hover': {
                  borderColor: 'rgba(139,92,246,0.4)',
                },
                '&.Mui-focused': {
                  borderColor: '#8b5cf6',
                  boxShadow: '0 0 0 4px rgba(139,92,246,0.1)'
                },
                '& fieldset': { border: 'none' }
              }
            }}
          />
        </form>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(124,58,237,0.1))',
          backdropFilter: 'blur(10px)',
          p: 2,
          borderRadius: '16px',
          border: '2px solid rgba(139,92,246,0.2)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(139,92,246,0.2)',
            borderColor: 'rgba(139,92,246,0.4)'
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ 
              width: 28, 
              height: 28, 
              mr: 1.5,
              background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
              fontSize: 14,
              boxShadow: '0 4px 12px rgba(139,92,246,0.4)'
            }}>
              🧠
            </Avatar>
            <Typography variant="body2" sx={{ 
              fontWeight: 600, 
              fontSize: 13,
              color: '#7c3aed'
            }}>
              Smart Assistant
            </Typography>
          </Box>
          <IconButton 
            size="small" 
            onClick={handleSendAiMessage}
            disabled={!isConnected || !aiMessage.trim() || !canSendMessages}
            sx={{ 
              background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
              color: 'white',
              width: 28,
              height: 28,
              '&:hover': {
                background: 'linear-gradient(45deg, #7c3aed, #6d28d9)',
                transform: 'scale(1.1)'
              },
              '&:disabled': {
                background: 'rgba(156,163,175,0.3)',
                color: 'rgba(156,163,175,0.6)'
              }
            }}
          >
            <ArrowForward sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>

        {/* User Info Card */}
        <Box sx={{ 
          mt: 2, 
          p: 1.5, 
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="caption" sx={{ 
            fontSize: 11,
            fontWeight: 600,
            color: '#64748b'
          }}>
            👤 {user?.username || 'Guest'} ({user?.role || 'viewer'})
          </Typography>
          <Typography variant="caption" sx={{ 
            fontSize: 10,
            color: canSendMessages ? '#10b981' : '#ef4444',
            fontWeight: 700
          }}>
            {canSendMessages ? '✅ Active' : '👁️ View Only'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPanel;
