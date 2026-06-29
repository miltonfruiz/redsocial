Aquí te dejo un ejemplo de cómo podrías implementar rutas Express protegidas con JWT para una red social con posts y comentarios:
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Conecta a la base de datos
mongoose.connect('mongodb://localhost/red-social', { useNewUrlParser: true, useUnifiedTopology: true });

// Define el modelo de usuario
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Define el modelo de post
const postSchema = new mongoose.Schema({
  titulo: String,
  contenido: String,
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});
const Post = mongoose.model('Post', postSchema);

// Define el modelo de comentario
const comentarioSchema = new mongoose.Schema({
  contenido: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});
const Comentario = mongoose.model('Comentario', comentarioSchema);

// Función para verificar el token JWT
const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acceso denegado. No se proporcionó token.');
  try {
    const decoded = jwt.verify(token, 'mi-llave-secreta');
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(400).send('Token inválido.');
  }
};

// Rutas protegidas con JWT
const app = express();
app.use(express.json());

// Registro de usuario
app.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;
  const usuario = new Usuario({ nombre, email, password: await bcrypt.hash(password, 10) });
  try {
    await usuario.save();
    const token = jwt.sign({ _id: usuario._id }, 'mi-llave-secreta', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(400).send('Usuario no encontrado.');
  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) return res.status(400).send('Contraseña inválida.');
  const token = jwt.sign({ _id: usuario._id }, 'mi-llave-secreta', { expiresIn: '1h' });
  res.send({ token });
});

// Crear post
app.post('/posts', verificarToken, async (req, res) => {
  const { titulo, contenido } = req.body;
  const post = new Post({ titulo, contenido, autor: req.usuario._id });
  try {
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Obtener posts
app.get('/posts', verificarToken, async (req, res) => {
  const posts = await Post.find().populate('autor', 'nombre');
  res.send(posts);
});

// Crear comentario
app.post('/comentarios', verificarToken, async (req, res) => {
  const { contenido, post } = req.body;
  const comentario = new Comentario({ contenido, post, autor: req.usuario._id });
  try {
    await comentario.save();
    res.send(comentario);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Obtener comentarios de un post
app.get('/comentarios/:idPost', verificarToken, async (req, res) => {
  const comentarios = await Comentario.find({ post: req.params.idPost }).populate('autor', 'nombre');
  res.send(comentarios);
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
```
Recuerda que debes reemplazar `'mi-llave-secreta'` con una llave secreta válida para firmar y verificar los tokens JWT.