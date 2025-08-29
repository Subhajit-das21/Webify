import React from 'react';
import { Box, Typography } from '@mui/material';

const TaskManagement: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Task Management
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Kanban board and task management features coming soon...
      </Typography>
    </Box>
  );
};

export default TaskManagement;
