// src/middleware/upload.js
const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (/^image\/(jpe?g|png|webp|gif)$/i.test(file.mimetype)) cb(null, true);
  else cb(new Error("Tipo de archivo no permitido (solo imágenes)"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
