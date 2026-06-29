Aquí te dejo un ejemplo de controlador CRUD para una red social con posts y comentarios utilizando JavaScript:

```javascript
class Post {
  constructor(id, texto, usuario) {
    this.id = id;
    this.texto = texto;
    this.usuario = usuario;
    this.comentarios = [];
  }

  agregarComentario(comentario) {
    this.comentarios.push(comentario);
  }

  eliminarComentario(idComentario) {
    this.comentarios = this.comentarios.filter(comentario => comentario.id !== idComentario);
  }
}

class Comentario {
  constructor(id, texto, usuario) {
    this.id = id;
    this.texto = texto;
    this.usuario = usuario;
  }
}

class Controlador {
  constructor() {
    this.posts = [];
  }

  // CRUD para posts
  crearPost(texto, usuario) {
    const id = this.posts.length + 1;
    const post = new Post(id, texto, usuario);
    this.posts.push(post);
    return post;
  }

  leerPosts() {
    return this.posts;
  }

  leerPost(id) {
    return this.posts.find(post => post.id === id);
  }

  actualizarPost(id, texto) {
    const post = this.leerPost(id);
    if (post) {
      post.texto = texto;
    }
  }

  eliminarPost(id) {
    this.posts = this.posts.filter(post => post.id !== id);
  }

  // CRUD para comentarios
  crearComentario(idPost, texto, usuario) {
    const post = this.leerPost(idPost);
    if (post) {
      const id = post.comentarios.length + 1;
      const comentario = new Comentario(id, texto, usuario);
      post.agregarComentario(comentario);
      return comentario;
    }
  }

  leerComentarios(idPost) {
    const post = this.leerPost(idPost);
    if (post) {
      return post.comentarios;
    }
  }

  leerComentario(idPost, idComentario) {
    const post = this.leerPost(idPost);
    if (post) {
      return post.comentarios.find(comentario => comentario.id === idComentario);
    }
  }

  actualizarComentario(idPost, idComentario, texto) {
    const post = this.leerPost(idPost);
    if (post) {
      const comentario = post.comentarios.find(comentario => comentario.id === idComentario);
      if (comentario) {
        comentario.texto = texto;
      }
    }
  }

  eliminarComentario(idPost, idComentario) {
    const post = this.leerPost(idPost);
    if (post) {
      post.eliminarComentario(idComentario);
    }
  }
}

// Ejemplo de uso
const controlador = new Controlador();

// Crear posts
const post1 = controlador.crearPost("Hola, mundo!", "Juan");
const post2 = controlador.crearPost("Este es otro post", "Maria");

// Leer posts
console.log(controlador.leerPosts());

// Crear comentarios
const comentario1 = controlador.crearComentario(post1.id, "Me gusta!", "Pedro");
const comentario2 = controlador.crearComentario(post1.id, "No me gusta", "Luis");

// Leer comentarios
console.log(controlador.leerComentarios(post1.id));

// Eliminar comentario
controlador.eliminarComentario(post1.id, comentario1.id);

// Leer comentarios después de eliminar uno
console.log(controlador.leerComentarios(post1.id));
```

Este código define una clase `Post` que representa un post en la red social, con un `id`, `texto` y `usuario`. También tiene un array de `comentarios`. La clase `Comentario` representa un comentario en la red social, con un `id`, `texto` y `usuario`.

La clase `Controlador` es la que maneja la lógica de la aplicación. Tiene métodos para crear, leer, actualizar y eliminar posts y comentarios. También tiene métodos para agregar y eliminar comentarios de un post.

En el ejemplo de uso, creamos dos posts y dos comentarios en el primer post. Luego, leemos los posts y los comentarios del primer post. Finalmente, eliminamos un comentario y volvemos a leer los comentarios del primer post para verificar que se ha eliminado correctamente.