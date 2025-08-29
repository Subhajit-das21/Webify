const mongoose = require('mongoose');

const codeFileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  versions: [{
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    hash: String
  }],
  collaborators: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    cursor: {
      line: Number,
      column: Number
    },
    selection: {
      start: { line: Number, column: Number },
      end: { line: Number, column: Number }
    },
    lastActive: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }],
  isExecutable: {
    type: Boolean,
    default: false
  },
  executionEnvironment: {
    type: String,
    enum: ['node', 'python', 'java', 'cpp', 'browser', 'docker'],
    default: 'node'
  },
  executionHistory: [{
    code: String,
    output: String,
    error: String,
    executedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    executedAt: {
      type: Date,
      default: Date.now
    },
    executionTime: Number // in milliseconds
  }],
  permissions: {
    canRead: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    canWrite: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    canExecute: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }
}, {
  timestamps: true
});

codeFileSchema.index({ workspace: 1, name: 1 });
codeFileSchema.index({ author: 1 });

module.exports = mongoose.model('CodeFile', codeFileSchema);
