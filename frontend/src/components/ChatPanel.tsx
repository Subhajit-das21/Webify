import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Avatar,
  IconButton,
  InputAdornment,
  Divider,
} from '@mui/material';
import { Send, MoreVert, ArrowForward } from '@mui/icons-material';

const ChatPanel: React.FC = () => {
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: 1,
      user: 'Jane',
      role: 'yesterday',
      message: 'wle staterrmayl',
      time: '15fl',
      avatar: 'J'
    },
    {
      id: 2,
      user: 'Vex',
      role: 'Exan',
      message: '29/\\k poonle today',
      time: '2 ld',
      avatar: 'V'
    },
    {
      id: 3,
      user: 'Egplol',
      role: 'True',
      message: 'DOlyl 1/10.so ltrud..',
      time: '1:5fl',
      avatar: 'E'
    },
    {
      id: 4,
      user: 'Make',
      role: 'Pann',
      message: 'A leusttnltd to keeenl but you mailtteinced?',
      time: '1:5fl',
      avatar: 'M'
    },
  ];

  return (
    <Box sx={{ 
      width: 350, 
      bgcolor: 'white',
      borderLeft: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Chat Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Chat
        </Typography>
        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </Box>

      {/* Messages */}
      <Box sx={{ flexGrow: 1, p: 2, overflow: 'auto' }}>
        {messages.map((msg) => (
          <Box key={msg.id} sx={{ display: 'flex', mb: 3 }}>
            <Avatar sx={{ width: 32, height: 32, mr: 2, fontSize: 14 }}>
              {msg.avatar}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                  {msg.user}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                  {msg.role}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {msg.time}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {msg.message}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Message Input */}
      <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0' }}>
        <TextField
          fullWidth
          placeholder="Message dhisen."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  <Send fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Divider />

      {/* AI Assistant */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            All Assistant
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ?
          </Typography>
        </Box>
        
        <TextField
          fullWidth
          placeholder="Ask mis anything..."
          size="small"
          sx={{ mb: 2 }}
        />

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: '#f8fafc',
          p: 2,
          borderRadius: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#2563eb' }}>
              A
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Assistant
            </Typography>
          </Box>
          <IconButton size="small">
            <ArrowForward fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPanel;
