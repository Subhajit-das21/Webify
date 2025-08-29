import React from 'react';
import { Box, Avatar, IconButton } from '@mui/material';
import { Home, PlayArrow, FastForward } from '@mui/icons-material';

const VideoCallSection: React.FC = () => {
  return (
    <Box sx={{
      width: '300px',
      height: '180px',
      p: 2,
      borderRadius: 2,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      bgcolor: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #e2e8f0'
    }}>
      {/* Video Avatar */}
      <Avatar sx={{ 
        width: 96, 
        height: 96, 
        mb: 2, 
        bgcolor: '#e2e8f0',
        fontSize: 32,
        fontWeight: 600,
        color: '#64748b'
      }}>
        U
      </Avatar>

      {/* Video Controls */}
      <Box sx={{ 
        display: 'flex', 
        gap: 0.8,
        bgcolor: '#f8fafc', 
        p: 1.2, 
        borderRadius: '50px',
        border: '1px solid #e2e8f0'
      }}>
        <IconButton 
          sx={{ 
            width: 36,
            height: 36,
            bgcolor: '#64748b', 
            color: 'white', 
            '&:hover': { bgcolor: '#475569' } 
          }}
        >
          <Home fontSize="small" />
        </IconButton>
        <IconButton 
          sx={{ 
            width: 36,
            height: 36,
            bgcolor: '#64748b', 
            color: 'white', 
            '&:hover': { bgcolor: '#475569' } 
          }}
        >
          <PlayArrow fontSize="small" />
        </IconButton>
        <IconButton 
          sx={{ 
            width: 36,
            height: 36,
            bgcolor: '#64748b', 
            color: 'white', 
            '&:hover': { bgcolor: '#475569' } 
          }}
        >
          <FastForward fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default VideoCallSection;
