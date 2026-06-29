```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Por favor, rellene todos los campos' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, rellene todos los campos' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Correo electrónico o contraseña inválidos' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Correo electrónico o contraseña inválidos' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });

      res.status(200).json({ token, userId: user._id });
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('token');
      res.status(200).json({ message: 'Sesión cerrada con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al cerrar sesión' });
    }
  },
};

module.exports = authController;
```