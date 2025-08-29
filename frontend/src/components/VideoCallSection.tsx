import React from 'react';
import { Box, Typography, IconButton, Avatar, Badge } from '@mui/material';
import { Videocam, Mic, ScreenShare, Call, CallEnd } from '@mui/icons-material';

const VideoCallSection: React.FC = () => {
  return (
    <Box sx={{ 
      width: 350,
      display: 'flex',
      flexDirection: 'column',
      mr: 3
    }}>
      {/* Video Call Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.05))',
        p: 2,
        borderRadius: '12px',
        border: '1px solid rgba(16,185,129,0.2)'
      }}>
        <Videocam sx={{ 
          mr: 2, 
          fontSize: 28,
          color: '#10b981'
        }} />
        <Typography variant="h6" sx={{ 
          fontWeight: 700,
          color: '#1f2937',
          fontSize: 18
        }}>
          Team Meeting
        </Typography>
      </Box>

      {/* Video Call Interface */}
      <Box sx={{ 
        flexGrow: 1,
        background: 'linear-gradient(135deg, #1f2937, #374151)',
        borderRadius: '20px',
        p: 3,
        position: 'relative',
        minHeight: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Participants */}
        <Box sx={{ 
          display: 'flex',
          gap: 2,
          mb: 2,
          flexWrap: 'wrap'
        }}>
          {[
            { name: 'You', status: 'speaking', avatar: '👤' },
            { name: 'Sarah', status: 'muted', avatar: '👩‍💼' },
            { name: 'Mike', status: 'online', avatar: '👨‍💻' },
            { name: 'Alex', status: 'away', avatar: '👨‍🎨' }
          ].map((participant) => (
            <Box key={participant.name} sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Badge
                badgeContent={
                  participant.status === 'speaking' ? '🔊' :
                  participant.status === 'muted' ? '🔇' :
                  participant.status === 'away' ? '⏰' : '🟢'
                }
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: 12,
                    minWidth: 20,
                    height: 20,
                    borderRadius: '50%'
                  }
                }}
              >
                <Avatar sx={{ 
                  width: 48,
                  height: 48,
                  background: participant.status === 'speaking' ? 
                    'linear-gradient(45deg, #10b981, #059669)' :
                    'linear-gradient(45deg, #6b7280, #4b5563)',
                  fontSize: 20,
                  border: participant.status === 'speaking' ? 
                    '3px solid #10b981' : '2px solid #374151'
                }}>
                  {participant.avatar}
                </Avatar>
              </Badge>
              <Typography variant="caption" sx={{ 
                color: 'white',
                mt: 1,
                fontSize: 11,
                fontWeight: 600
              }}>
                {participant.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Meeting Info */}
        <Box sx={{ 
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          p: 2,
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.2)',
          mb: 2
        }}>
          <Typography variant="body2" sx={{ 
            color: 'white',
            fontWeight: 600,
            mb: 1
          }}>
            📊 Daily Standup Meeting
          </Typography>
          <Typography variant="caption" sx={{ 
            color: 'rgba(255,255,255,0.7)',
            display: 'block'
          }}>
            Duration: 23:45 • 4 participants
          </Typography>
        </Box>

        {/* Call Controls */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: 2
        }}>
          <IconButton sx={{ 
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            '&:hover': {
              background: 'rgba(255,255,255,0.25)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s ease'
          }}>
            <Mic />
          </IconButton>
          <IconButton sx={{ 
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            '&:hover': {
              background: 'rgba(255,255,255,0.25)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s ease'
          }}>
            <Videocam />
          </IconButton>
          <IconButton sx={{ 
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            '&:hover': {
              background: 'rgba(255,255,255,0.25)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s ease'
          }}>
            <ScreenShare />
          </IconButton>
          <IconButton sx={{ 
            background: 'linear-gradient(45deg, #ef4444, #dc2626)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(45deg, #dc2626, #b91c1c)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s ease'
          }}>
            <CallEnd />
          </IconButton>
        </Box>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ 
        mt: 2,
        display: 'flex',
        gap: 1
      }}>
        {[
          { icon: <Call />, label: 'Start Call', color: '#10b981' },
          { icon: <ScreenShare />, label: 'Share Screen', color: '#3b82f6' }
        ].map((action, index) => (
          <Box key={index} sx={{ 
            flexGrow: 1,
            background: `linear-gradient(135deg, ${action.color}15, ${action.color}05)`,
            border: `1px solid ${action.color}33`,
            borderRadius: '12px',
            p: 1.5,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: `${action.color}20`,
              transform: 'translateY(-2px)'
            }
          }}>
            <Box sx={{ 
              color: action.color,
              mb: 0.5,
              display: 'flex',
              justifyContent: 'center'
            }}>
              {action.icon}
            </Box>
            <Typography variant="caption" sx={{ 
              fontWeight: 600,
              color: action.color,
              fontSize: 11
            }}>
              {action.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default VideoCallSection;
