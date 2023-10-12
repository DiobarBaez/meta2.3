const mongoose = require('mongoose');

const arrendatarioSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  cve:{
    type:Number,
  },
  rfc:{
    type: Number,
  },
  folio:{
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Arrendatario', arrendatarioSchema);
