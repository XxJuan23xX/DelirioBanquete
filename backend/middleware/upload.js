// src/middleware/upload.js
const multer = require("multer");

const storage = multer.memoryStorage(); // guarda el archivo en RAM (buffer)

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = upload;
