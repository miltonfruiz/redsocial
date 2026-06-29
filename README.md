# Red Social con Posts y Comentarios
## Descripción
La presente aplicación es una red social básica que permite a los usuarios crear cuentas, publicar posts y comentar en los posts de otros usuarios.

## Stack Tecnológico
* **Backend:** Node.js con Express.js
* **Base de Datos:** MongoDB
* **Autenticación:** JSON Web Tokens (JWT)
* **Frontend:** React.js (no incluido en este proyecto)

## Instalación
1. Clonar el repositorio: `git clone https://github.com/usuario/repo.git`
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno:
	* `MONGO_URI`: URI de conexión a la base de datos de MongoDB
	* `JWT_SECRET`: Secreto para firmar tokens JWT
4. Iniciar servidor: `npm start`

## Docker
1. Construir imagen: `docker build -t red-social .`
2. Iniciar contenedor: `docker run -p 3000:3000 red-social`
3. Configurar variables de entorno en el contenedor:
	* `MONGO_URI`: URI de conexión a la base de datos de MongoDB
	* `JWT_SECRET`: Secreto para firmar tokens JWT

## Endpoints
### Usuarios
* **POST /users**: Crear un nuevo usuario
	+ Body: `{ username, email, password }`
* **GET /users**: Obtener lista de usuarios
* **GET /users/:id**: Obtener un usuario por ID
* **PUT /users/:id**: Actualizar un usuario
	+ Body: `{ username, email, password }`
* **DELETE /users/:id**: Eliminar un usuario

### Posts
* **POST /posts**: Crear un nuevo post
	+ Body: `{ title, content, userId }`
* **GET /posts**: Obtener lista de posts
* **GET /posts/:id**: Obtener un post por ID
* **PUT /posts/:id**: Actualizar un post
	+ Body: `{ title, content }`
* **DELETE /posts/:id**: Eliminar un post

### Comentarios
* **POST /comments**: Crear un nuevo comentario
	+ Body: `{ content, postId, userId }`
* **GET /comments**: Obtener lista de comentarios
* **GET /comments/:id**: Obtener un comentario por ID
* **PUT /comments/:id**: Actualizar un comentario
	+ Body: `{ content }`
* **DELETE /comments/:id**: Eliminar un comentario

## Seguridad
* **Autenticación**: Se utiliza JSON Web Tokens (JWT) para autenticar a los usuarios.
* **Autorización**: Se utiliza middleware de autorización para verificar si un usuario está autorizado a realizar una acción en particular.
* **Validación**: Se utiliza validación de entrada para asegurarse de que los datos sean válidos y seguros.
* **Cifrado**: Se utiliza cifrado para proteger los datos sensibles, como las contraseñas de los usuarios.