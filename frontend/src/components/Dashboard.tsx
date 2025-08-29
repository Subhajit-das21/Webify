import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Avatar,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Notifications,
  Search,
  MoreVert,
  ExpandMore,
} from '@mui/icons-material';
import Sidebar from './Sidebar';
import TaskBoard from './TaskBoard';
import ChatPanel from './ChatPanel';
import AnalyticsSection from './AnalyticsSection';
import VideoCallSection from './VideoCallSection';
import CodeEditor from './CodeEditor';

const Dashboard: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('tasks');
  const [isOffline, setIsOffline] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const renderMainContent = () => {
    switch (currentSection) {
      case 'code':
        return <CodeEditor />;
      case 'chat':
        return (
          <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
            <Typography variant="h4" gutterBottom sx={{ 
              color: '#1f2937', 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              💬 Team Chat
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: 16 }}>
              Real-time team communication integrated in the sidebar panel. 
              Chat with your team members, share ideas, and collaborate seamlessly.
            </Typography>
          </Box>
        );
      case 'files':
        return (
          <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
            <Typography variant="h4" gutterBottom sx={{ 
              color: '#1f2937', 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #10b981, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              📁 File Manager
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: 16 }}>
              Advanced file management system with version control, 
              collaborative editing, and secure sharing capabilities.
            </Typography>
          </Box>
        );
      case 'analytics':
        return (
          <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
            <Typography variant="h4" gutterBottom sx={{ 
              color: '#1f2937', 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #f59e0b, #d97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              📊 Analytics Dashboard
            </Typography>
            <AnalyticsSection />
          </Box>
        );
      default:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Enhanced Tab Section */}
            <Box sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              px: 3, 
              pt: 2,
              background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
              borderRadius: '0 0 16px 16px',
              boxShadow: '0 4px 20px rgba(59,130,246,0.3)'
            }}>
              <Tabs 
                value={tabValue} 
                onChange={(e, newValue) => setTabValue(newValue)}
                sx={{
                  '& .MuiTab-root': {
                    fontWeight: 700,
                    fontSize: 16,
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.3s ease',
                    borderRadius: '12px 12px 0 0',
                    mr: 2,
                    px: 4,
                    py: 2,
                    minHeight: 48,
                    '&.Mui-selected': {
                      color: '#3b82f6',
                      background: 'white',
                      boxShadow: '0 6px 20px rgba(59,130,246,0.2)',
                    },
                    '&:hover': {
                      background: 'rgba(255,255,255,0.15)',
                      color: 'white',
                    }
                  },
                  '& .MuiTabs-indicator': {
                    display: 'none'
                  },
                }}
              >
                <Tab label="📋 TASKS" />
                <Tab label="🤝 COLLABORATION" />
              </Tabs>
            </Box>

            {/* Task Management Section - Expanded */}
            <Box sx={{ 
              flexGrow: 1,
              minHeight: '500px', // Increased minimum height
              overflow: 'auto'
            }}>
              <TaskBoard />
            </Box>

            {/* Analytics Section - Expanded */}
            <Box sx={{ 
              p: 3, 
              minHeight: '400px', // Set minimum height for analytics
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: '16px 16px 0 0',
              mt: 2
            }}>
              <Typography variant="h5" gutterBottom sx={{ 
                fontWeight: 700,
                color: '#1f2937',
                mb: 3,
                background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                📊 Progress & Analytics
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, height: '300px' }}>
                <VideoCallSection />
                <AnalyticsSection />
              </Box>
            </Box>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #f0f9ff 100%)',
      fontFamily: '"Inter", "Roboto", sans-serif'
    }}>
      <Sidebar
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        isOffline={isOffline}
      />
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Enhanced Header with NexFlow Branding */}
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #2563eb 100%)',
            boxShadow: '0 8px 32px rgba(59,130,246,0.3)',
            borderRadius: '0 0 20px 20px'
          }}
        >
          <Toolbar sx={{ minHeight: '80px !important', px: 4 }}>
            <Typography variant="h4" sx={{ 
              flexGrow: 1, 
              fontWeight: 800, 
              color: 'white',
              background: 'linear-gradient(45deg, #ffffff, #e0e7ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: 28
            }}>
              {currentSection === 'code' ? '💻 Code Editor' : 
               currentSection === 'analytics' ? '📊 Analytics Hub' :
               currentSection === 'files' ? '📁 File Manager' :
               currentSection === 'chat' ? '💬 Team Chat' :
               '🚀 NexFlow Dashboard'}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                background: 'linear-gradient(45deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))',
                backdropFilter: 'blur(20px)',
                px: 4, 
                py: 1.5, 
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
                <Typography variant="body1" sx={{ 
                  fontWeight: 700, 
                  color: 'white',
                  fontSize: 16
                }}>
                  ✨ Hello Team
                </Typography>
              </Box>
              
              <TextField
                placeholder="Search everything..."
                size="small"
                sx={{ 
                  minWidth: 280,
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '50px',
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.25)',
                    height: '48px',
                    fontSize: '16px',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.3)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255,255,255,0.3)',
                      boxShadow: '0 0 0 4px rgba(255,255,255,0.3)'
                    },
                    '& fieldset': { border: 'none' },
                    '& input::placeholder': { color: 'rgba(255,255,255,0.8)' }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 24 }} />
                    </InputAdornment>
                  ),
                }}
              />
              
              <IconButton 
                sx={{ 
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255,255,255,0.25)',
                  width: 48,
                  height: 48,
                  '&:hover': {
                    background: 'rgba(255,255,255,0.25)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Badge 
                  badgeContent={4} 
                  sx={{
                    '& .MuiBadge-badge': {
                      background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                      color: 'white',
                      boxShadow: '0 2px 8px rgba(239,68,68,0.5)'
                    },
                  }}
                >
                  <Notifications sx={{ color: 'white', fontSize: 24 }} />
                </Badge>
              </IconButton>
              
              <Avatar sx={{ 
                width: 48, 
                height: 48, 
                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                fontWeight: 700,
                fontSize: 20,
                boxShadow: '0 4px 12px rgba(245,158,11,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 6px 20px rgba(245,158,11,0.6)'
                }
              }}>
                👤
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content Area with Proper Spacing */}
        <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            {renderMainContent()}
          </Box>
          <ChatPanel />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
