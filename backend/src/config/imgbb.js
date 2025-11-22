// src/config/imgbb.js
const axios = require("axios");

async function uploadToImgBB(buffer) {
  const apiKey = process.env.IMGBB_KEY;
  if (!apiKey) {
    throw new Error("Falta IMGBB_KEY en el .env");
  }

  const base64Image = buffer.toString("base64");

  const formData = new URLSearchParams();
  formData.append("key", apiKey);
  formData.append("image", base64Image);

  const res = await axios.post("https://api.imgbb.com/1/upload", formData);
  return res.data.data.url; // URL pública de la imagen
}

module.exports = { uploadToImgBB };
