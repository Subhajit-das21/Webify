import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from '@mui/material';
import {
  Notifications,
  Search,
  AccountCircle,
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import TaskManagement from '../components/TaskManagement';
import CodeEditor from '../components/CodeEditor';
import TeamChat from '../components/TeamChat';
import FileManager from '../components/FileManager';

const Dashboard: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [isOffline, setIsOffline] = useState(false);

  const renderMainContent = () => {
    switch (currentSection) {
      case 'tasks':
        return <TaskManagement />;
      case 'code':
        return <CodeEditor />;
      case 'chat':
        return <TeamChat />;
      case 'files':
        return <FileManager />;
      default:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome to your remote team collaboration workspace
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* <Sidebar
        // open={true}
        onClose={() => {}}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        isOffline={isOffline}
      /> */}
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Task Management
            </Typography>
            <IconButton>
              <Search />
            </IconButton>
            <IconButton>
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {renderMainContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;