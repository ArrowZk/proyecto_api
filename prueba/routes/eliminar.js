const express = require('express'); // Importa Express para crear un enrutador
const router = express.Router(); // Crea un enrutador de Express
const Registro = require('../models/Registro.js'); // Importa el modelo de Registro

// Ruta para eliminar un registro por su ID
router.delete('/:id_banda', async (req, res) => {
    const { id_banda } = req.params; // Obtiene el ID de la banda de los parámetros de la solicitud

    try {
      // Encuentra y elimina un registro por su ID
      const registroEliminado = await Registro.findOneAndDelete({ id_banda });
  
      if (registroEliminado) {
        res.json({ message: 'Registro eliminado exitosamente', data: registroEliminado }); // Responde con un mensaje de éxito y los datos del registro eliminado en formato JSON
      } else {
        res.status(404).json({ error: 'Registro no encontrado' }); // Si no se encuentra el registro, responde con un estado 404 y un mensaje de error
      }
    } catch (error) {
      console.error(error); // Si hay un error, muestra el error en la consola
      res.status(500).json({ error: 'Error al eliminar el registro' }); // Responde con un mensaje de error y un estado 500
    }
});

module.exports = router; // Exporta el enrutador para su uso en otras partes de la aplicación
