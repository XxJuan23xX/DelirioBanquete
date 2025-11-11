// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes'); // <--- NUEVO

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Banquetera funcionando 🎉');
});

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes); // <--- NUEVO

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
