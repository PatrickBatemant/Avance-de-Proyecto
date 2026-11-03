El proyecto es una aplicacion web full stack para gestionar tareas.
Los usuarios pueden registrarse, iniciar sesion de forma segura y gestionar sus tareas con un sistema de autenticacion que usa tokens (JWT). 
El sistema esta diseñado con una arquitectura cliente-servidor, de esta forma esta separado el frontend y backend

Utiliza:
Backend: Node.js, Express.js

Base de Datos: MongoDB (gestionada con Mongoose)

Seguridad: JSON Web Tokens (JWT), Bcryptjs (encriptación de contraseñas)

Configuración: Dotenv (variables de entorno), Cors (control de acceso)

Frontend: HTML5, CSS3, JavaScript (Vanilla)

Estructura:

Avance de Proyecto/
│
├── backend/                  # Servidor y lógica de negocio
│   ├── middleware/           
│   │   └── auth.js           # Middleware para verificar tokens JWT
│   ├── models/               
│   │   ├── User.js           # Esquema de la base de datos para Usuarios
│   │   └── Task.js           # Esquema de la base de datos para Tareas
│   ├── routes/               
│   │   ├── auth.js           # Rutas de registro y login
│   │   └── tasks.js          # Rutas del CRUD de tareas
│   ├── .env                  # Variables de entorno (puerto, BD, secretos)
│   ├── package.json          # Dependencias del proyecto
│   └── ServerBackend.js      # Archivo principal (punto de entrada del servidor)
│
└── frontend/                 # Interfaz de usuario
    ├── index.html            # Vista de Login
    ├── dashboard.html        # Vista principal (gestión de tareas)
    ├── app.js                # Lógica del cliente (fetch API, manipulación del DOM)
    └── styles.css            # Estilos y diseño UI/UX

Carpetas Principales:

models/: Contiene los esquemas de Mongoose. Define cómo se guardan los datos. 
El modelo Task está vinculado al modelo User mediante un ObjectId para que cada usuario solo vea sus propias tareas.

routes/: Define los endpoints (URLs) de la API. 
Aquí se reciben las peticiones, se procesan (usando los modelos) y se devuelven las respuestas HTTP.

middleware/: Contiene funciones interceptoras. 
El archivo auth.js verifica que las peticiones a rutas protegidas incluyan un token JWT válido antes de permitir el acceso.

Documentación de Endpoints:

La API responde en formato JSON. Las rutas protegidas requieren que el cliente envíe un token en el header de la petición.

POST	/api/auth/register	Registra un nuevo usuario en el sistema. Encripta la contraseña con Bcrypt.	name, email, password de forma	Pública
POST	/api/auth/login	Autentica al usuario. Devuelve un token JWT válido por 1 hora.	email, password	de forma Pública

Gestion de Tareas:

Todas las rutas de esta sección requieren el Header: Authorization: Bearer <token_JWT>

GET	/api/tasks	Obtiene la lista de todas las tareas del usuario autenticado.	No requiere ningun dato
POST	/api/tasks	Crea una nueva tarea asignada al usuario autenticado.	Requiere title, description (opcional)
PUT	/api/tasks/:id	Actualiza el título, descripción o estado (completed) de una tarea por su ID. Requiere title, description, completed
DELETE	/api/tasks/:id	Elimina una tarea específica por su ID.	No requiere ningun dato

Ejecutar localmente:

Clonar el repositorio o descargar los archivos.

1. Configurar el Backend:

2. Abrir una terminal y navegar a la carpeta: cd backend

3. Instalar dependencias: npm install

4. Crear un archivo .env en la raíz del backend ej. variables:
  PORT=3000
  MONGO_URI=mongodb://localhost:27017/mi_base_de_datos
  JWT_SECRET=tu_clave_secreta

5. Iniciar el servidor node con ServerBackend.js

6. Abrir el archivo frontend/index.html
