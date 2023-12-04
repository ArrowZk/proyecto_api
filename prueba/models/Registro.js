const mongoose = require('mongoose'); // Importa Mongoose para definir esquemas y modelos

// Define el esquema para la colección "Registro"
const registroSchema = new mongoose.Schema({
  id_banda: { type: Number, unique: true }, // Define el atributo "id_banda" como un número único
  nombreBanda: String, // Define el atributo "nombreBanda" como una cadena de texto
  anoFormacion: Number, // Define el atributo "anoFormacion" como un número
  integrantes: [String], // Define el atributo "integrantes" como un array de cadenas de texto
  cancionPopular: String, // Define el atributo "cancionPopular" como una cadena de texto
  genero: String, // Define el atributo "genero" como una cadena de texto
  subgenero: String, // Define el atributo "subgenero" como una cadena de texto
});

// Crea el modelo "Registro" utilizando el esquema definido anteriormente
const Registro = mongoose.model('Registro', registroSchema);

module.exports = Registro; // Exporta el modelo "Registro" para su uso en otras partes de la aplicación
