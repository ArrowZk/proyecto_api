const express = require('express'); // Importa Express para crear el servidor
const mongoose = require('mongoose'); // Importa Mongoose para interactuar con MongoDB
const dotenv = require('dotenv'); // Importa dotenv para cargar variables de entorno
const path = require('path'); // Importa path para trabajar con rutas de archivos

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express(); // Crea una aplicación Express
const PORT = process.env.PORT || 3000; // Define el puerto en el que se ejecutará el servidor

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // Conecta con MongoDB Atlas
const db = mongoose.connection; // Obtiene la conexión a la base de datos

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:')); // Maneja errores de conexión a MongoDB
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB Atlas'); // Confirma la conexión exitosa a MongoDB Atlas
});

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones a formato JSON

// Define rutas específicas para cada operación CRUD
app.use('/crear', require('./routes/crear')); // Ruta para crear registros
app.use('/eliminar', require('./routes/eliminar')); // Ruta para eliminar registros
app.use('/actualizar', require('./routes/actualizar')); // Ruta para actualizar registros
app.use('/consultar', require('./routes/consultar')); // Ruta para consultar registros

// Configuración para buscar archivos estáticos (en este caso, archivos HTML)
app.use(express.static(path.join(__dirname, '../public_html')));

// Listener que indica cuando el servidor se ha iniciado y está escuchando en un puerto específico
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
