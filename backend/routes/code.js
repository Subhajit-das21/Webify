const express = require('express');
const CodeFile = require('../models/CodeFile');
const auth = require('../middleware/auth');
const { executeCode } = require('../utils/codeExecution');

const router = express.Router();

// Get all code files for workspace
router.get('/workspace/:workspaceId', auth, async (req, res) => {
  try {
    const files = await CodeFile.find({ 
      workspace: req.params.workspaceId 
    })
    .populate('author', 'username avatar')
    .populate('collaborators.user', 'username avatar')
    .sort({ createdAt: -1 });

    res.json(files);
  } catch (error) {
    console.error('Get code files error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new code file
router.post('/', auth, async (req, res) => {
  try {
    const { name, path, content, language, workspace, isExecutable } = req.body;

    const codeFile = new CodeFile({
      name,
      path,
      content,
      language,
      workspace,
      author: req.userId,
      isExecutable: isExecutable || false,
      permissions: {
        canRead: [req.userId],
        canWrite: [req.userId],
        canExecute: [req.userId]
      }
    });

    await codeFile.save();
    await codeFile.populate('author', 'username avatar');

    res.status(201).json({
      message: 'Code file created successfully',
      file: codeFile
    });
  } catch (error) {
    console.error('Create code file error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update code file content
router.put('/:fileId', auth, async (req, res) => {
  try {
    const { content, message } = req.body;
    
    const file = await CodeFile.findById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Save current version
    file.versions.push({
      content: file.content,
      author: req.userId,
      message: message || 'Auto-save',
      hash: Date.now().toString()
    });

    file.content = content;
    await file.save();

    res.json({
      message: 'File updated successfully',
      file
    });
  } catch (error) {
    console.error('Update code file error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Execute code
router.post('/:fileId/execute', auth, async (req, res) => {
  try {
    const file = await CodeFile.findById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const result = await executeCode(file.content, file.language);
    
    // Save execution history
    file.executionHistory.push({
      code: file.content,
      output: result.output,
      error: result.error,
      executedBy: req.userId,
      executionTime: result.executionTime
    });

    await file.save();

    res.json({
      success: !result.error,
      output: result.output,
      error: result.error,
      executionTime: result.executionTime
    });
  } catch (error) {
    console.error('Code execution error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get file versions
router.get('/:fileId/versions', auth, async (req, res) => {
  try {
    const file = await CodeFile.findById(req.params.fileId)
      .populate('versions.author', 'username avatar')
      .select('versions');

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.json(file.versions.reverse()); // Latest first
  } catch (error) {
    console.error('Get file versions error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update collaborator cursor
router.post('/:fileId/cursor', auth, async (req, res) => {
  try {
    const { line, column, selection } = req.body;
    
    const file = await CodeFile.findById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Find or create collaborator entry
    const collaboratorIndex = file.collaborators.findIndex(
      collab => collab.user.toString() === req.userId
    );

    if (collaboratorIndex > -1) {
      file.collaborators[collaboratorIndex].cursor = { line, column };
      if (selection) {
        file.collaborators[collaboratorIndex].selection = selection;
      }
      file.collaborators[collaboratorIndex].lastActive = new Date();
      file.collaborators[collaboratorIndex].isActive = true;
    } else {
      file.collaborators.push({
        user: req.userId,
        cursor: { line, column },
        selection,
        isActive: true
      });
    }

    await file.save();

    // Emit to other collaborators via socket
    req.io.to(`file_${req.params.fileId}`).emit('cursor_update', {
      userId: req.userId,
      cursor: { line, column },
      selection
    });

    res.json({ message: 'Cursor updated' });
  } catch (error) {
    console.error('Update cursor error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete code file
router.delete('/:fileId', auth, async (req, res) => {
  try {
    const file = await CodeFile.findById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if user is author or has delete permissions
    if (file.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await CodeFile.findByIdAndDelete(req.params.fileId);

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete code file error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
