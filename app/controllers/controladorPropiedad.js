const Propiedad = require('../models/propiedad');
const { httpError } = require('../helpers/handleError');

/**********   FUNCIONES PRINCIPALES   **********/

// Obtener todas las propiedades
const getPropiedades = async (req, res) => {
  try {
    const propiedades = await Propiedad.find();
    res.json(propiedades);
  } catch (error) {
    httpError(res, error);
  }
};

// Crear una nueva propiedad
const createPropiedad = async (req, res) => {
  try {
    const { id, cve_catastral, descripcion, direccion } = req.body;
    
    // Verificar si ya existe una propiedad con la misma clave catastral
    const propiedadExistente = await Propiedad.findOne({ cve_catastral: cve_catastral });

    if (propiedadExistente) {
      return res.status(409).json({ message: 'Ya existe una propiedad con la misma clave catastral' });
    }

    const propiedad = new Propiedad({
      id,
      cve_catastral,
      descripcion,
      direccion,
    });

    const newPropiedad = await propiedad.save();
    res.status(201).json({ data: newPropiedad });
  } catch (error) {
    httpError(res, error);
  }
};

/**********   CRUD POR PROPIEDAD DE ID   **********/

// Obtener una propiedad por su ID
const getPropiedadById = async (req, res) => {
  try {
    const propiedad = await Propiedad.findById(req.params.id);
    if (!propiedad) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }
    res.json(propiedad);
  } catch (error) {
    httpError(res, error);
  }
};

// Actualizar una propiedad por su ID
const updatePropiedad = async (req, res) => {
  try {
    const propiedad = await Propiedad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!propiedad) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }
    res.json(propiedad);
  } catch (error) {
    httpError(res, error);
  }
};

// Eliminar una propiedad por su ID
const deletePropiedad = async (req, res) => {
  try {
    const propiedad = await Propiedad.findByIdAndRemove(req.params.id);
    if (!propiedad) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }
    res.json({ message: 'Propiedad eliminada exitosamente' });
  } catch (error) {
    httpError(res, error);
  }
};

/**********   CRUD POR PROPIEDAD DE CVE_CATASTRAL  **********/

const getPropiedadByCve = async (req, res) => {
  try {
    const cve_catastral = req.params.cve_catastral; // Asumo que el parámetro en la URL es 'rfc'
    const propiedad = await Propiedad.findOne({ cve_catastral: cve_catastral });

    if (!propiedad) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    res.json(propiedad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una propiedad por su CVE_CATASTRAL
const updatePropiedadByCve = async (req, res) => {
  try {
    const cve_catastral = req.params.cve_catastral; // Asumo que el parámetro en la URL es 'rfc'
    const propiedad = await Propiedad.findOneAndUpdate({ cve_catastral: cve_catastral }, req.body, { new: true });

    if (!propiedad) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    res.json(propiedad);
  } catch (error) {
    httpError(res, error);
  }
  
};

// Eliminar una propiedad por su CVE_CATASTRAL
const deletePropiedadByCve = async (req, res) => {
  try {
    const cve_catastral = req.params.cve_catastral; // Asumo que el parámetro en la URL es 'rfc'
    const propiedad = await Propiedad.findOneAndRemove({ cve_catastral: cve_catastral });

    if (!propiedad) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    res.json({ message: 'Propiedad eliminada exitosamente' });
  } catch (error) {
    httpError(res, error);
  }
};

module.exports = { getPropiedades, getPropiedadById, createPropiedad, updatePropiedad, deletePropiedad, getPropiedadByCve, updatePropiedadByCve, deletePropiedadByCve };
