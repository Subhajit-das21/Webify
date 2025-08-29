import React from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AnalyticsSection: React.FC = () => {
  const lineData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 450 },
  ];

  const barData = [
    { name: 'A', value: 25 },
    { name: 'B', value: 45 },
    { name: 'C', value: 65 },
    { name: 'D', value: 85 },
    { name: 'E', value: 55 },
  ];

  const pieData = [
    { name: 'Completed', value: 60, color: '#3b82f6' },
    { name: 'In Progress', value: 30, color: '#64748b' },
    { name: 'Todo', value: 10, color: '#e2e8f0' },
  ];

  return (
    <Box sx={{
      flexGrow: 1,
      p: 2,
      height: '180px',
      borderRadius: 2,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      bgcolor: 'white',
      ml: 2,
      border: '1px solid #e2e8f0'
    }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: 16, color: '#1f2937' }}>
        Progress & Analytics
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, height: 'calc(100% - 40px)' }}>
        {/* Line Chart */}
        <Box sx={{ height: 60, mb: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2.5} 
                dot={false}
                strokeDasharray="none"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Bar Chart and Pie Chart Row */}
        <Box sx={{ display: 'flex', gap: 2, height: 60 }}>
          {/* Bar Chart */}
          <Box sx={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <Bar dataKey="value" fill="#64748b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* Pie Chart */}
          <Box sx={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={15} 
                  outerRadius={25} 
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsSection;
