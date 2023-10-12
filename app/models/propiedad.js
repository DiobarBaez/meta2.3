const mongoose = require('mongoose');

const propiedadSchema = new mongoose.Schema({
  id:{
    type:Number,
  }, 
  cve_catastral: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    default: '',
  },
  direccion: {
    type: String,
  },
});

module.exports = mongoose.model('Propiedad', propiedadSchema);
