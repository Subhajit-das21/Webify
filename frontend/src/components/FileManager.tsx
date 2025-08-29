import React from 'react';
import { Box, Typography } from '@mui/material';

const FileManager: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        File Manager
      </Typography>
      <Typography variant="body2" color="text.secondary">
        File management system coming soon...
      </Typography>
    </Box>
  );
};

export default FileManager;
