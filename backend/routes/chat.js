const express = require('express');
const Chat = require('../models/Chat');
const auth = require('../middleware/auth');

const router = express.Router();

// Get chat messages for workspace
router.get('/workspace/:workspaceId', auth, async (req, res) => {
  try {
    const chat = await Chat.findOne({ 
      workspace: req.params.workspaceId,
      channel: 'general' 
    }).populate('messages.user', 'username avatar');

    if (!chat) {
      return res.json({ messages: [] });
    }

    res.json({ messages: chat.messages });
  } catch (error) {
    console.error('Get chat error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Send message
router.post('/', auth, async (req, res) => {
  try {
    const { workspaceId, content, type = 'text' } = req.body;

    let chat = await Chat.findOne({ workspace: workspaceId, channel: 'general' });
    if (!chat) {
      chat = new Chat({ workspace: workspaceId, channel: 'general' });
    }

    const message = {
      user: req.userId,
      content,
      type,
      createdAt: new Date()
    };

    chat.messages.push(message);
    await chat.save();

    res.status(201).json({
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
