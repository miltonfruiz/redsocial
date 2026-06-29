```javascript
// server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

// Conectar con MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Modelo de Post
const postSchema = new mongoose.Schema({
  texto: String,
  comentarios: [{ tipo: String, texto: String }]
});
const Post = mongoose.model('Post', postSchema);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

// Limitar requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Limitar a 100 requests por ventana
});
app.use(limiter);

// Rutas
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ mensaje: 'Post no encontrado' });
  res.json(post);
});

app.post('/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

app.put('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ mensaje: 'Post no encontrado' });
  post.texto = req.body.texto;
  await post.save();
  res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ mensaje: 'Post no encontrado' });
  await post.remove();
  res.json({ mensaje: 'Post eliminado' });
});

app.post('/posts/:id/comentarios', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ mensaje: 'Post no encontrado' });
  post.comentarios.push(req.body);
  await post.save();
  res.json(post);
});

// Iniciar servidor
const puerto = process.env.PUERTO || 3000;
app.listen(puerto, () => {
  console.log(`Servidor iniciado en el puerto ${puerto}`);
});
```