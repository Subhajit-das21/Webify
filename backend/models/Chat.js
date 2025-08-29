const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },
  channel: {
    type: String,
    default: 'general'
  },
  messages: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    type: {
      type: String,
      enum: ['text', 'file', 'code', 'system', 'ai'],
      default: 'text'
    },
    mentions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    thread: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    reactions: [{
      emoji: String,
      users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
    }],
    attachments: [{
      name: String,
      url: String,
      type: String,
      size: Number
    }],
    codeSnippet: {
      language: String,
      code: String
    },
    edited: {
      isEdited: {
        type: Boolean,
        default: false
      },
      editedAt: Date,
      originalContent: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  activeUsers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    socketId: String,
    joinedAt: {
      type: Date,
      default: Date.now
    },
    isTyping: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

chatSchema.index({ workspace: 1, channel: 1 });

module.exports = mongoose.model('Chat', chatSchema);
