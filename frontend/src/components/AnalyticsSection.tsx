import React from 'react';
import { Box, Typography, LinearProgress, Paper } from '@mui/material';
import { TrendingUp, Assessment, Timeline } from '@mui/icons-material';

const AnalyticsSection: React.FC = () => {
  return (
    <Box sx={{ 
      flexGrow: 1,
      display: 'flex', 
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Analytics Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(147,197,253,0.05))',
        p: 2,
        borderRadius: '12px',
        border: '1px solid rgba(59,130,246,0.2)'
      }}>
        <Assessment sx={{ 
          mr: 2, 
          fontSize: 28,
          color: '#3b82f6'
        }} />
        <Typography variant="h6" sx={{ 
          fontWeight: 700,
          color: '#1f2937',
          fontSize: 18
        }}>
          Progress & Analytics
        </Typography>
      </Box>

      {/* Analytics Charts Area */}
      <Box sx={{ 
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        {/* Progress Chart */}
        <Paper sx={{ 
          p: 3,
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
          boxShadow: '0 4px 20px rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.1)',
          flexGrow: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Timeline sx={{ mr: 1, color: '#3b82f6' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Team Progress
            </Typography>
          </Box>

          {/* Simulated Line Chart */}
          <Box sx={{ 
            height: '120px',
            position: 'relative',
            background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
            borderRadius: '12px',
            overflow: 'hidden',
            mb: 3,
            display: 'flex',
            alignItems: 'end',
            px: 2,
            pb: 2
          }}>
            <svg width="100%" height="100%" viewBox="0 0 300 100">
              <path 
                d="M 20 80 Q 50 60 80 65 T 140 50 T 200 45 T 280 40" 
                stroke="#3b82f6" 
                strokeWidth="3" 
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              <path 
                d="M 20 80 Q 50 60 80 65 T 140 50 T 200 45 T 280 40 L 280 100 L 20 100 Z" 
                fill="url(#lineGradient)" 
                opacity="0.2"
              />
            </svg>
          </Box>

          {/* Progress Bars */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {[
              { label: 'Design', value: 85, color: '#8b5cf6' },
              { label: 'Development', value: 70, color: '#3b82f6' },
              { label: 'Testing', value: 60, color: '#10b981' },
              { label: 'Deployment', value: 45, color: '#f59e0b' },
              { label: 'Documentation', value: 90, color: '#ef4444' }
            ].map((item) => (
              <Box key={item.label} sx={{ 
                minWidth: 120, 
                flexGrow: 1,
                background: 'rgba(255,255,255,0.6)',
                p: 1.5,
                borderRadius: '8px'
              }}>
                <Typography variant="caption" sx={{ 
                  fontWeight: 600, 
                  color: '#64748b',
                  display: 'block',
                  mb: 0.5
                }}>
                  {item.label}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={item.value}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: item.color,
                      borderRadius: 3,
                    },
                  }}
                />
                <Typography variant="caption" sx={{ 
                  fontWeight: 700, 
                  color: item.color,
                  fontSize: 12
                }}>
                  {item.value}%
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Stats Cards */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[
            { title: 'Tasks Completed', value: '47', change: '+12%', color: '#10b981' },
            { title: 'Active Projects', value: '8', change: '+2', color: '#3b82f6' },
            { title: 'Team Productivity', value: '94%', change: '+8%', color: '#f59e0b' }
          ].map((stat, index) => (
            <Paper key={index} sx={{ 
              p: 2,
              borderRadius: '12px',
              background: `linear-gradient(135deg, rgba(${
                stat.color === '#10b981' ? '16,185,129' :
                stat.color === '#3b82f6' ? '59,130,246' :
                '245,158,11'
              },0.1), rgba(255,255,255,0.8))`,
              border: `1px solid ${stat.color}33`,
              flexGrow: 1,
              minWidth: 120,
              textAlign: 'center'
            }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 800,
                color: stat.color,
                mb: 0.5
              }}>
                {stat.value}
              </Typography>
              <Typography variant="caption" sx={{ 
                color: '#64748b',
                fontWeight: 600,
                display: 'block',
                mb: 0.5
              }}>
                {stat.title}
              </Typography>
              <Typography variant="caption" sx={{ 
                color: stat.color,
                fontWeight: 700,
                fontSize: 11
              }}>
                {stat.change}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsSection;
