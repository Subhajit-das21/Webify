const express = require('express');
const Workspace = require('../models/Workspace');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all workspaces for user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('workspaces.workspace');
    const workspaces = user.workspaces.map(w => w.workspace);
    res.json(workspaces);
  } catch (error) {
    console.error('Get workspaces error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new workspace
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, type = 'private' } = req.body;

    const workspace = new Workspace({
      name,
      description,
      type,
      owner: req.userId,
      members: [{
        user: req.userId,
        role: 'admin'
      }]
    });

    await workspace.save();

    // Add workspace to user
    await User.findByIdAndUpdate(req.userId, {
      $push: {
        workspaces: {
          workspace: workspace._id,
          role: 'admin'
        }
      }
    });

    res.status(201).json({
      message: 'Workspace created successfully',
      workspace
    });
  } catch (error) {
    console.error('Create workspace error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get workspace by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id)
      .populate('members.user', 'username email avatar')
      .populate('owner', 'username email avatar');

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    res.json(workspace);
  } catch (error) {
    console.error('Get workspace error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
