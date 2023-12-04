const express = require('express'); // Importa Express para crear un enrutador
const router = express.Router(); // Crea un enrutador de Express
const Registro = require('../models/Registro.js'); // Importa el modelo de Registro

// Ruta para agregar un nuevo registro
router.post('/', async (req, res) => {
    try {
      const existingRegistro = await Registro.findOne({ id_banda: req.body.id_banda });

        if (existingRegistro) {
            return res.status(400).json({ error: 'Ya existe un registro con este ID de Banda' });
        }
        // Crea un nuevo registro utilizando los datos proporcionados en req.body
        const nuevoRegistro = await Registro.create(req.body);
        res.status(201).json(nuevoRegistro); // Responde con el nuevo registro creado y un estado 201 (creado satisfactoriamente)
      } catch (error) {
        console.error(error); // Si hay un error, muestra el error en la consola
        res.status(500).json({ error: 'Error al agregar el registro' }); // Responde con un mensaje de error y un estado 500
      }
});

module.exports = router; // Exporta el enrutador para su uso en otras partes de la aplicación
