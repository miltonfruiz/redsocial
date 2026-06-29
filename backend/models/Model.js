```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  contenido: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario' }]
});

const comentarioSchema = new mongoose.Schema({
  contenido: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

const Post = mongoose.model('Post', postSchema);
const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = { Post, Comentario };
```