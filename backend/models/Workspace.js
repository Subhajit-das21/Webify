const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  type: {
    type: String,
    enum: ['private', 'public'],
    default: 'private'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['admin', 'member', 'viewer', 'code-contributor'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    permissions: {
      canCreateTasks: { type: Boolean, default: true },
      canDeleteTasks: { type: Boolean, default: false },
      canManageMembers: { type: Boolean, default: false },
      canAccessCode: { type: Boolean, default: true },
      canExecuteCode: { type: Boolean, default: true }
    }
  }],
  inviteCode: {
    type: String,
    unique: true
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  settings: {
    allowGuestAccess: {
      type: Boolean,
      default: false
    },
    codeEditorEnabled: {
      type: Boolean,
      default: true
    },
    aiAssistantEnabled: {
      type: Boolean,
      default: true
    },
    videoCallEnabled: {
      type: Boolean,
      default: true
    },
    maxMembers: {
      type: Number,
      default: 50
    }
  },
  statistics: {
    totalTasks: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    totalFiles: { type: Number, default: 0 },
    totalMessages: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

workspaceSchema.pre('save', function(next) {
  if (!this.inviteCode) {
    this.inviteCode = Math.random().toString(36).substring(2, 15);
  }
  next();
});

module.exports = mongoose.model('Workspace', workspaceSchema);
