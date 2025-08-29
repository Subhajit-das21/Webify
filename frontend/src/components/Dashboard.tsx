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
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import TaskBoard from '../components/TaskBoard';
import ChatPanel from '../components/ChatPanel';
import AnalyticsSection from '../components/AnalyticsSection';
import VideoCallSection from '../components/VideoCallSection';
import CodeEditor from '../components/CodeEditor';

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
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1f2937', fontWeight: 600 }}>
              Team Chat
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time chat integrated in the sidebar panel
            </Typography>
          </Box>
        );
      case 'files':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1f2937', fontWeight: 600 }}>
              File Manager
            </Typography>
            <Typography variant="body2" color="text.secondary">
              File management system with version control
            </Typography>
          </Box>
        );
      case 'analytics':
        return (
          <Box sx={{ p: 2 }}>
            <AnalyticsSection />
          </Box>
        );
      default:
        return (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, bgcolor: 'white' }}>
              <Tabs 
                value={tabValue} 
                onChange={(e, newValue) => setTabValue(newValue)}
                sx={{
                  '& .MuiTab-root': {
                    fontWeight: 600,
                    fontSize: 13,
                    textTransform: 'uppercase',
                    color: '#64748b',
                    '&.Mui-selected': {
                      color: '#3b82f6',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#3b82f6',
                    height: 3,
                  },
                }}
              >
                <Tab label="TASKS" />
                <Tab label="COLLABORATION" />
              </Tabs>
            </Box>
            <TaskBoard />
            <Box sx={{ p: 2, display: 'flex', gap: 2, height: 220 }}>
              <VideoCallSection />
              <AnalyticsSection />
            </Box>
          </>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f8fafc' }}>
      <Sidebar
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        isOffline={isOffline}
      />
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <AppBar 
          position="static" 
          color="default" 
          elevation={0}
          sx={{ 
            bgcolor: 'white',
            borderBottom: '1px solid #e2e8f0'
          }}
        >
          <Toolbar sx={{ minHeight: '56px !important' }}>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: '#1f2937' }}>
              {currentSection === 'code' ? 'Code Editor' : 'Task Management'}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                bgcolor: '#f0f9ff', 
                px: 2, 
                py: 0.5, 
                borderRadius: 1,
                mr: 2,
                border: '1px solid #bfdbfe'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#3b82f6', fontSize: 13 }}>
                  Hello
                </Typography>
              </Box>
              
              <TextField
                placeholder="Search..."
                size="small"
                sx={{ 
                  mr: 2, 
                  minWidth: 180,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#f8fafc',
                    '&:hover': {
                      bgcolor: '#f1f5f9',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'white',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" sx={{ color: '#64748b' }} />
                    </InputAdornment>
                  ),
                }}
              />
              
              <IconButton 
                sx={{ 
                  mr: 1,
                  '&:hover': {
                    bgcolor: '#f0f9ff',
                  },
                }}
              >
                <Badge 
                  badgeContent={4} 
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: '#ef4444',
                      color: 'white',
                    },
                  }}
                >
                  <Notifications sx={{ color: '#64748b' }} />
                </Badge>
              </IconButton>
              
              <Avatar sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: '#3b82f6',
                fontWeight: 600,
                fontSize: 14,
                '&:hover': {
                  bgcolor: '#2563eb',
                },
              }}>
                U
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Main Content */}
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            {renderMainContent()}
          </Box>

          {/* Chat Panel */}
          <ChatPanel />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
