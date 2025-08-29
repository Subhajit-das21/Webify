const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/File');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Get all files for workspace
router.get('/workspace/:workspaceId', auth, async (req, res) => {
  try {
    const files = await File.find({ workspace: req.params.workspaceId })
      .populate('uploadedBy', 'username avatar')
      .sort({ createdAt: -1 });

    res.json(files);
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload file
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { workspaceId } = req.body;

    const file = new File({
      name: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype,
      workspace: workspaceId,
      uploadedBy: req.userId
    });

    await file.save();
    await file.populate('uploadedBy', 'username avatar');

    res.status(201).json({
      message: 'File uploaded successfully',
      file
    });
  } catch (error) {
    console.error('Upload file error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
