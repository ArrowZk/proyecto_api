const express = require('express'); // Importa Express para crear un enrutador
const router = express.Router(); // Crea un enrutador de Express
const Registro = require('../models/Registro.js'); // Importa el modelo de Registro

// Ruta para obtener todos los registros
router.get('/', async (req, res) => {
    try {
        // Busca y selecciona solo ciertos campos de todos los registros
        const registros = await Registro.find().select('id_banda nombreBanda anoFormacion integrantes cancionPopular genero subgenero');
        res.json(registros); // Responde con los registros encontrados en formato JSON
      } catch (err) {
        res.status(500).json({ message: err.message }); // Si hay un error, responde con un mensaje de error y un estado 500
      }
});

// Ruta para obtener un registro por su ID
router.get('/:id_banda', async (req, res) => {
    const { id_banda } = req.params; // Obtiene el ID de la banda de los parámetros de la solicitud
    try {
      // Busca un registro por su ID y selecciona solo ciertos campos
      const registro = await Registro.findOne({ id_banda }).select('id_banda nombreBanda anoFormacion integrantes cancionPopular genero subgenero');
      if (registro) {
        res.json(registro); // Si se encuentra el registro, responde con el registro encontrado en formato JSON
      } else {
        res.status(404).json({ error: 'Registro no encontrado' }); // Si no se encuentra el registro, responde con un estado 404 y un mensaje de error
      }
    } catch (error) {
      console.error(error); // Si hay un error, muestra el error en la consola
      res.status(500).json({ error: 'Error al obtener el registro por ID' }); // Responde con un mensaje de error y un estado 500
    }
});

module.exports = router; // Exporta el enrutador para su uso en otras partes de la aplicación
