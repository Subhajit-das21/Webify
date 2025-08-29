import React from 'react';
import { Box, Typography } from '@mui/material';

const TeamChat: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Team Chat
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Real-time chat features coming soon...
      </Typography>
    </Box>
  );
};

export default TeamChat;
