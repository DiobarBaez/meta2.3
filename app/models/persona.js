const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  id:{
    type: Number,
  },
  rfc: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Persona', personaSchema);
