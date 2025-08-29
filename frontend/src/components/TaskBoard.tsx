import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { ExpandMore, MoreVert } from '@mui/icons-material';

interface Task {
  id: string;
  title: string;
  subtitle?: string;
}

interface Column {
  title: string;
  tasks: Task[];
}

const columns: Column[] = [
  {
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Date 3', subtitle: '15 Aec' },
      { id: '2', title: 'Test 2' },
      { id: '3', title: 'Dabs 1' },
      { id: '4', title: 'Test 8', subtitle: 'Gal' },
    ],
  },
  {
    title: 'In Progress',
    tasks: [
      { id: '6', title: 'Date 4', subtitle: '13 Alec' },
      { id: '7', title: 'Jaye', subtitle: 'FGOt' },
      { id: '8', title: 'Tess 8', subtitle: 'Oato' },
    ],
  },
  {
    title: 'Done',
    tasks: [
      { id: '10', title: 'Date 3', subtitle: 'Test' },
      { id: '11', title: 'Date 8', subtitle: 'Moto' },
    ],
  },
];

const TaskBoard: React.FC = () => {
  return (
    <Box sx={{ 
      p: 3, 
      minHeight: '600px', // Increased minimum height
      overflow: 'auto',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <Box sx={{ display: 'flex', gap: 4, minHeight: 500 }}>
        {columns.map((column, index) => (
          <Box key={column.title} sx={{ 
            minWidth: 320, // Increased width
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Enhanced Column Header */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 3,
              background: `linear-gradient(135deg, ${
                index === 0 ? '#fee2e2, #fecaca' : 
                index === 1 ? '#fef3c7, #fed7aa' : 
                '#dcfce7, #bbf7d0'
              })`,
              p: 3,
              borderRadius: '20px',
              border: `3px solid ${
                index === 0 ? '#fca5a5' : 
                index === 1 ? '#fbbf24' : 
                '#86efac'
              }`,
              boxShadow: `0 8px 25px ${
                index === 0 ? 'rgba(248,113,113,0.3)' : 
                index === 1 ? 'rgba(251,191,36,0.3)' : 
                'rgba(134,239,172,0.3)'
              }`
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 800, 
                fontSize: 20,
                color: index === 0 ? '#dc2626' : index === 1 ? '#d97706' : '#059669'
              }}>
                {column.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {column.title === 'In Progress' && (
                  <ExpandMore sx={{ color: '#d97706', fontSize: 24 }} />
                )}
                <IconButton size="small">
                  <MoreVert fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Enhanced Task Cards */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flexGrow: 1 }}>
              {column.tasks.map((task) => (
                <Box
                  key={task.id}
                  sx={{ 
                    background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
                    border: '2px solid rgba(226,232,240,0.8)',
                    borderRadius: '20px',
                    p: 3,
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    backdropFilter: 'blur(10px)',
                    minHeight: '120px', // Set minimum height for cards
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '6px',
                      background: `linear-gradient(90deg, ${
                        index === 0 ? '#3b82f6, #1d4ed8' : 
                        index === 1 ? '#f59e0b, #d97706' : 
                        '#10b981, #059669'
                      })`,
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                      borderColor: 'rgba(59,130,246,0.4)',
                      '&:before': {
                        height: '8px'
                      }
                    }
                  }}
                >
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: task.subtitle ? 1 : 0,
                        fontSize: 18,
                        color: '#1f2937'
                      }}
                    >
                      {task.title}
                    </Typography>
                    {task.subtitle && (
                      <Typography variant="body2" sx={{ 
                        color: '#64748b', 
                        fontSize: 14,
                        fontWeight: 500
                      }}>
                        {task.subtitle}
                      </Typography>
                    )}
                  </Box>
                  
                  {/* Enhanced task footer */}
                  <Box sx={{ 
                    mt: 2, 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 1,
                      alignItems: 'center'
                    }}>
                      <Avatar sx={{ 
                        width: 32, 
                        height: 32, 
                        fontSize: 12,
                        background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
                        fontWeight: 700
                      }}>
                        👤
                      </Avatar>
                    </Box>
                    <Box sx={{
                      px: 3,
                      py: 1,
                      borderRadius: '50px',
                      background: `linear-gradient(45deg, ${
                        index === 0 ? 'rgba(59,130,246,0.1), rgba(29,78,216,0.1)' : 
                        index === 1 ? 'rgba(245,158,11,0.1), rgba(217,119,6,0.1)' : 
                        'rgba(16,185,129,0.1), rgba(5,150,105,0.1)'
                      })`,
                      border: `2px solid ${
                        index === 0 ? 'rgba(59,130,246,0.3)' : 
                        index === 1 ? 'rgba(245,158,11,0.3)' : 
                        'rgba(16,185,129,0.3)'
                      }`
                    }}>
                      <Typography variant="caption" sx={{ 
                        fontSize: 12, 
                        fontWeight: 700,
                        color: index === 0 ? '#1d4ed8' : index === 1 ? '#d97706' : '#059669'
                      }}>
                        {index === 0 ? 'New' : index === 1 ? 'Active' : 'Done'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TaskBoard;
