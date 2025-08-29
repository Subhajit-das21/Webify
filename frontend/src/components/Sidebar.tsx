import React from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  Divider
} from '@mui/material';
import {
  Dashboard,
  Code,
  Chat,
  InsertDriveFile,
  BarChart,
  Group,
  Settings,
  WifiOff
} from '@mui/icons-material';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isOffline?: boolean;
}

const menuItems = [
  { id: 'tasks', label: 'Task Management', icon: <Dashboard /> },
  { id: 'code', label: 'Code Editor', icon: <Code /> },
  { id: 'chat', label: 'Team Chat', icon: <Chat /> },
  { id: 'files', label: 'Files', icon: <InsertDriveFile /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart /> },
  { id: 'team', label: 'Team', icon: <Group /> },
  { id: 'settings', label: 'Settings', icon: <Settings /> },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  currentSection, 
  onSectionChange, 
  isOffline = false 
}) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, rgba(59,130,246,0.05) 0%, rgba(147,197,253,0.1) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(59,130,246,0.1)',
          borderRadius: '0 20px 20px 0',
          boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(59,130,246,0.1)',
          p: 2,
        },
      }}
    >
      {/* Header with Glassmorphism */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          p: 2,
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 4px 24px rgba(59,130,246,0.15)'
        }}>
          <Avatar sx={{ 
            width: 32, 
            height: 32, 
            mr: 2, 
            background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
            fontWeight: 700,
            fontSize: 14,
            boxShadow: '0 4px 12px rgba(59,130,246,0.4)'
          }}>
            🚀
          </Avatar>
          <Typography variant="h6" sx={{ 
            fontWeight: 700, 
            fontSize: 18,
            background: 'linear-gradient(45deg, #1f2937, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
           NexFlow
          </Typography>
        </Box>
        
        {isOffline && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'linear-gradient(45deg, rgba(251,191,36,0.1), rgba(245,158,11,0.1))',
            backdropFilter: 'blur(10px)',
            p: 1.5, 
            borderRadius: '12px',
            border: '1px solid rgba(251,191,36,0.2)',
            mb: 2 
          }}>
            <WifiOff sx={{ mr: 1.5, fontSize: 16, color: '#f59e0b' }} />
            <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 600 }}>
              Offline Mode
            </Typography>
          </Box>
        )}
      </Box>

      {/* Enhanced Navigation Menu */}
      <List sx={{ mb: 2, p: 0 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            button
            selected={currentSection === item.id}
            onClick={() => onSectionChange(item.id)}
            sx={{
              borderRadius: '12px',
              mb: 1,
              py: 1.5,
              px: 2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: 'white',
                boxShadow: '0 8px 25px rgba(59,130,246,0.4)',
                transform: 'translateY(-2px)',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)',
                  pointerEvents: 'none'
                },
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
              '&:hover:not(.Mui-selected)': {
                background: 'rgba(59,130,246,0.1)',
                transform: 'translateX(8px)',
                boxShadow: '0 4px 12px rgba(59,130,246,0.2)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: currentSection === item.id ? 700 : 600
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Team We Assesses Section */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ 
          px: 2, 
          pb: 1, 
          color: '#64748b',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontSize: 11
        }}>
          Team We Assesses
        </Typography>
        
        <Box sx={{ px: 1 }}>
          {[
            { name: 'Designs', time: '8:40 m', color: '#8b5cf6' },
            { name: 'Development', time: '10:34m', color: '#3b82f6' },
            { name: 'Marketing', time: '80:3xm', color: '#10b981' }
          ].map((team, index) => (
            <Box key={team.name} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1,
              px: 2,
              mb: 1,
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255,255,255,0.6)',
                transform: 'translateX(4px)'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ 
                  width: 24, 
                  height: 24, 
                  mr: 1.5, 
                  background: team.color,
                  fontSize: 10,
                  fontWeight: 700
                }}>
                  {team.name.charAt(0)}
                </Avatar>
                <Typography variant="body2" sx={{ 
                  fontWeight: 600,
                  fontSize: 13
                }}>
                  {team.name}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ 
                color: '#64748b',
                fontSize: 11,
                fontWeight: 500
              }}>
                {team.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ mx: 2, my: 2, borderColor: 'rgba(59,130,246,0.1)' }} />

      {/* Files Section */}
      <Box sx={{ px: 2 }}>
        <Typography variant="caption" sx={{ 
          pb: 1, 
          color: '#64748b',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontSize: 11,
          display: 'block'
        }}>
          Files
        </Typography>
        
        {[
          { name: 'Document.pdf', size: '17 Mn', color: '#ef4444' },
          { name: 'Report.frog', size: '14.8m', color: '#3b82f6' },
          { name: 'image.png', size: '2 MB', color: '#10b981' }
        ].map((file) => (
          <Box key={file.name} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1,
            mb: 1,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateX(4px)',
              '& .file-icon': {
                transform: 'scale(1.1)'
              }
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box className="file-icon" sx={{ 
                width: 20, 
                height: 20, 
                mr: 1.5, 
                background: file.color,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }}>
                <InsertDriveFile sx={{ fontSize: 12, color: 'white' }} />
              </Box>
              <Typography variant="body2" sx={{ 
                fontWeight: 500,
                fontSize: 13
              }}>
                {file.name}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ 
              color: '#94a3b8',
              fontSize: 10
            }}>
              {file.size}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* User Profile */}
      <Box sx={{ 
        mt: 'auto', 
        p: 2,
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 4px 24px rgba(59,130,246,0.15)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ 
            width: 40, 
            height: 40, 
            mr: 2,
            background: 'linear-gradient(45deg, #f59e0b, #d97706)',
            fontWeight: 700,
            fontSize: 16,
            boxShadow: '0 4px 12px rgba(245,158,11,0.4)'
          }}>
            S
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 700,
              fontSize: 14,
              color: '#1f2937'
            }}>
              Subhajit Das
            </Typography>
            <Typography variant="caption" sx={{ 
              color: '#64748b',
              fontSize: 12
            }}>
              Lead Developer
            </Typography>
          </Box>
          <IconButton size="small" sx={{
            background: 'rgba(59,130,246,0.1)',
            '&:hover': {
              background: 'rgba(59,130,246,0.2)',
              transform: 'rotate(90deg)'
            },
            transition: 'all 0.3s ease'
          }}>
            <Settings sx={{ fontSize: 16, color: '#3b82f6' }} />
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
