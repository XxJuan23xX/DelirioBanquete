const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// POST /api/auth/register
const registerUser = async (req, res) => {
  
  try {
    console.log('HEADERS REGISTER:', {
  channel: req.get('x-app-channel'),
  appKey: req.get('x-app-key'),
  all: req.headers,
});

    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Nombre, correo, teléfono y contraseña son obligatorios' });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // --- Canal y seguridad ---
    const channel = (req.get('x-app-channel') || 'web').toLowerCase();
    let role = 'cliente';

    if (channel === 'mobile') {
      const appKey = req.get('x-app-key');
      if (!appKey || appKey !== process.env.MOBILE_APP_KEY) {
        return res.status(401).json({ message: 'Clave de app móvil inválida' });
      }
      role = 'vendedor';
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role, // asignado por el servidor según canal
      avatar: user.avatar,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Error en registerUser:', error);
    return res.status(500).json({ message: 'Error en el registro' });
  }
};

// POST /api/auth/login (sin cambios relevantes)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Correo o contraseña incorrectos' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Correo o contraseña incorrectos' });

    const token = generateToken(user._id);

    return res.json({
      message: 'Login correcto',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error('Error en loginUser:', error);
    return res.status(500).json({ message: 'Error en el login' });
  }
};

module.exports = { registerUser, loginUser };
