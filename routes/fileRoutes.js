
const express = require('express');
const multer = require('multer');
const { uploadFile, fetchFile } = require('../controllers/fileController');

const router = express.Router();

// Multer configuration for handling multipart/form-data (in memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

// Define routes
router.post('/upload', upload.single('file'), uploadFile);
router.get('/fetch/:key', fetchFile);

module.exports = router;
