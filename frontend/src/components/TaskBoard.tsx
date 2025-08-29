import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { MoreVert, ExpandMore } from '@mui/icons-material';

const TaskBoard: React.FC = () => {
  const columns = [
    {
      title: 'To Do',
      tasks: [
        { id: 1, title: 'Date 3', subtitle: '15 Aec' },
        { id: 2, title: 'Test 2' },
        { id: 3, title: 'Dabs 1' },
        { id: 4, title: 'Test 8', subtitle: 'Gal' },
      ]
    },
    {
      title: 'In Progress',
      tasks: [
        { id: 5, title: 'Date 4', subtitle: '13 Atec' },
        { id: 6, title: 'Jaye', subtitle: 'FGOt' },
        { id: 7, title: 'Tess 8', subtitle: 'Oato' },
      ]
    },
    {
      title: 'Done',
      tasks: [
        { id: 8, title: 'Date 3', subtitle: 'Test' },
        { id: 9, title: 'Date 8', subtitle: 'Moto' },
      ]
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Kanban Board */}
      <Box sx={{ display: 'flex', gap: 3, overflow: 'auto' }}>
        {columns.map((column) => (
          <Box key={column.title} sx={{ minWidth: 300, flexShrink: 0 }}>
            {/* Column Header */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 2 
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {column.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {column.title === 'In Progress' && (
                  <ExpandMore sx={{ color: '#64748b' }} />
                )}
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
            </Box>

            {/* Tasks */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {column.tasks.map((task) => (
                <Card key={task.id} sx={{ 
                  bgcolor: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                      {task.title}
                    </Typography>
                    {task.subtitle && (
                      <Typography variant="body2" color="text.secondary">
                        {task.subtitle}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {/* Add Task Button */}
              <Card sx={{ 
                bgcolor: 'transparent',
                border: '2px dashed #e2e8f0',
                boxShadow: 'none',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#2563eb'
                }
              }}>
                <CardContent sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  '&:last-child': { pb: 2 }
                }}>
                  <Typography variant="body2" color="text.secondary">
                    + Add task
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TaskBoard;
