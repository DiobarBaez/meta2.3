const mongoose = require('mongoose');

const propietarioSchema = new mongoose.Schema({
  id:{
    type:Number,
  },
  folio:{
    type:Number,
  },
  rfc: {
    type: Number,
    required: true,
  },
  cve_catastral: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Propietario', propietarioSchema);