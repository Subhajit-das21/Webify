import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const Workspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Workspace {id}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Workspace details and collaboration tools will be implemented here
      </Typography>
    </Box>
  );
};

export default Workspace;
