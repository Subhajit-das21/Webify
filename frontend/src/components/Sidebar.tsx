import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Badge,
  Divider,
} from '@mui/material';
import {
  People,
  Code,
  Assignment,
  Chat,
  Folder,
  Analytics,
  Settings,
  WifiOff,
  Description,
  Image,
} from '@mui/icons-material';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isOffline?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSectionChange,
  isOffline = false,
}) => {
  const menuItems = [
    { id: 'tasks', label: 'Task Management', icon: <Assignment /> },
    { id: 'code', label: 'Code Editor', icon: <Code /> },
    { id: 'chat', label: 'Team Chat', icon: <Chat /> },
    { id: 'files', label: 'Files', icon: <Folder /> },
    { id: 'analytics', label: 'Analytics', icon: <Analytics /> },
    { id: 'team', label: 'Team', icon: <People /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> },
  ];

  const teamMembers = [
    { name: 'Designs', time: '8:40 m', avatar: 'D', online: true },
    { name: 'Development', time: '10:34m', avatar: 'D', online: true },
    { name: 'Marketing', time: '80:3xm', avatar: 'M', online: false },
  ];

  const files = [
    { name: 'Document.pdf', size: '17 Mm', icon: <Description /> },
    { name: 'Report.frog', size: '14.8m', icon: <Description /> },
    { name: 'image.png', size: '2 MB', icon: <Image /> },
    { name: 'Document.loff', size: '19 kK', icon: <Description /> },
    { name: 'Reptxrfrm', size: '17 MB', icon: <Description /> },
    { name: 'image.prg', size: '7 tm', icon: <Image /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          bgcolor: '#f8fafc',
          borderRight: '1px solid #e2e8f0',
          p: 2,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#2563eb' }}>
            R
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Remote team
          </Typography>
        </Box>
        
        {isOffline && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            bgcolor: '#fef3c7', 
            p: 1, 
            borderRadius: 1,
            mb: 2 
          }}>
            <WifiOff sx={{ mr: 1, fontSize: 16 }} />
            <Typography variant="caption">Offline</Typography>
          </Box>
        )}
      </Box>

      {/* Navigation Menu */}
      <List sx={{ mb: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            button
            selected={currentSection === item.id}
            onClick={() => onSectionChange(item.id)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&.Mui-selected': {
                bgcolor: '#e2e8f0',
                '&:hover': {
                  bgcolor: '#e2e8f0',
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: currentSection === item.id ? 600 : 400
              }}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Team Members Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#64748b' }}>
          Team We Assesses
        </Typography>
        
        {teamMembers.map((member, index) => (
          <Box key={member.name} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', mr: 1 }}>
              <Avatar sx={{ width: 24, height: 24, fontSize: 12, mr: -0.5, zIndex: 2 }}>
                {member.avatar}
              </Avatar>
              <Avatar sx={{ width: 24, height: 24, fontSize: 12, ml: -0.5, zIndex: 1 }}>
                {member.avatar}
              </Avatar>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {member.name}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {member.time}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Files Sections */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#64748b' }}>
          Files
        </Typography>
        
        {files.slice(0, 3).map((file) => (
          <Box key={file.name} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ mr: 2, color: '#64748b' }}>
              {file.icon}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {file.name}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {file.size}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#64748b' }}>
          Files
        </Typography>
        
        {files.slice(3).map((file) => (
          <Box key={file.name} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ mr: 2, color: '#64748b' }}>
              {file.icon}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {file.name}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {file.size}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Offline Status */}
      <Box sx={{ mt: 'auto', p: 2, bgcolor: 'white', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <WifiOff sx={{ mr: 2, color: '#64748b' }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Offline
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
