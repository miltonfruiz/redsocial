```tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  texto: string;
  comentarios: Comentario[];
}

interface Comentario {
  id: number;
  texto: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nuevoPost, setNuevoPost] = useState('');
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [postId, setPostId] = useState<number | null>(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/posts', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  const handleCrearPost = () => {
    if (token) {
      axios.post('http://localhost:5000/posts', { texto: nuevoPost }, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setPosts([...posts, response.data]);
          setNuevoPost('');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCrearComentario = () => {
    if (token && postId !== null) {
      axios.post(`http://localhost:5000/posts/${postId}/comentarios`, { texto: nuevoComentario }, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          const postIndex = posts.findIndex((post) => post.id === postId);
          if (postIndex !== -1) {
            const nuevoPost = { ...posts[postIndex] };
            nuevoPost.comentarios = [...nuevoPost.comentarios, response.data];
            const nuevosPosts = [...posts];
            nuevosPosts[postIndex] = nuevoPost;
            setPosts(nuevosPosts);
          }
          setNuevoComentario('');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleIniciarSesion = () => {
    axios.post('http://localhost:5000/iniciar-sesion', { username: 'usuario', password: 'contraseña' })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {token ? (
        <div>
          <h1>Posts</h1>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <p>{post.texto}</p>
                <ul>
                  {post.comentarios.map((comentario) => (
                    <li key={comentario.id}>{comentario.texto}</li>
                  ))}
                </ul>
                <input
                  type="text"
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  placeholder="Nuevo comentario"
                />
                <button onClick={() => {
                  setPostId(post.id);
                  handleCrearComentario();
                }}>
                  Crear comentario
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={nuevoPost}
            onChange={(e) => setNuevoPost(e.target.value)}
            placeholder="Nuevo post"
          />
          <button onClick={handleCrearPost}>
            Crear post
          </button>
        </div>
      ) : (
        <button onClick={handleIniciarSesion}>
          Iniciar sesión
        </button>
      )}
    </div>
  );
}

export default App;
```