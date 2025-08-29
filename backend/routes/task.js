const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tasks for workspace
router.get('/workspace/:workspaceId', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ workspace: req.params.workspaceId })
      .populate('assignee', 'username avatar')
      .populate('reporter', 'username avatar')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, status, priority, assignee, workspace, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      status: status || 'todo',
      priority: priority || 'medium',
      assignee,
      reporter: req.userId,
      workspace,
      dueDate
    });

    await task.save();
    await task.populate(['assignee', 'reporter'], 'username avatar');

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate(['assignee', 'reporter'], 'username avatar');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
