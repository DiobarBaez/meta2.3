const Propietario = require('../models/propietario');
const { httpError } = require('../helpers/handleError');

/**********   FUNCIONES PRINCIPALES   **********/

// Obtener todos los propietarios
const getPropietarios = async (req, res) => {
  try {
    const propietarios = await Propietario.find();
    res.json(propietarios);
  } catch (error) {
    httpError(res, error);
  }
};

// Crear un propietario
const createPropietario = async (req, res) => {
  try {
    const { id, folio, rfc, cve_catastral } = req.body;
    
    // Verificar si ya existe un propietario para esa propiedad
    const propietarioExistente = await Propietario.findOne({ cve_catastral: cve_catastral });

    if (propietarioExistente) {
      return res.status(400).json({ message: 'Ya existe un propietario para esa propiedad.' });
    }

    const propietario = new Propietario({
      id,
      folio,
      rfc,
      cve_catastral,
    });

    const newPropietario = await propietario.save();
    res.status(201).json({ data: newPropietario });

  } catch (error) {
    httpError(res, error);
  }
};

/**********   CRUD POR PROPIEDAD DE ID   **********/

// Obtener un propietario por su ID
const getPropietarioById = async (req, res) => {
  try {
    const propietario = await Propietario.findById(req.params.id);
    if (!propietario) {
      return res.status(404).json({ message: 'Propietario no encontrado' });
    }
    res.json(propietario);
  } catch (error) {
    httpError(res, error);
  }
};

// Actualizar un propietario por su ID
const updatePropietario = async (req, res) => {
  try {
    const propietario = await Propietario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!propietario) {
      return res.status(404).json({ message: 'Propietario no encontrado' });
    }
    res.json(propietario);
  } catch (error) {
    httpError(res, error);
  }
};

// Eliminar un propietario por su ID
const deletePropietario = async (req, res) => {
  try {
    const propietario = await Propietario.findByIdAndRemove(req.params.id);
    if (!propietario) {
      return res.status(404).json({ message: 'Propietario no encontrado' });
    }
    res.json({ message: 'Propietario eliminado exitosamente' });
  } catch (error) {
    httpError(res, error);
  }
};

/**********   CRUD POR PROPIEDAD DE Folio   **********/

// Obtener un propietario por su folio
const getPropietarioByFolio = async (req, res) => {
  try {
    const folio = req.params.folio;
    const propietario = await Propietario.find({ folio: folio });

    if (!propietario) {
      return res.status(404).json({ message: 'Propietario no encontrado' });
    }

    res.json(propietario);
  } catch (error) {
    httpError(res, error);
  }
};

// Actualizar un propietario por su folio
const updatePropietarioByFolio = async (req, res) => {
  try {
    const folio = req.params.folio;
    const propietario = await Propietario.findOneAndUpdate({ folio: folio }, req.body, { new: true });

    if (!propietario) {
      return res.status(404).json({ message: 'Propietario no encontrado' });
    }

    res.json(propietario);
  } catch (error) {
    httpError(res, error);
  }
};

// Eliminar un propietario por su folio
const deletePropietarioByFolio = async (req, res) => {
  try {
    const folio = req.params.folio;
    const propietario = await Propietario.findOneAndRemove({ folio: folio });

    if (!propietario) {
      return res.status(404).json({ message: 'Propietario no encontrado' });
    }

    res.json({ message: 'Propietario eliminado exitosamente' });
  } catch (error) {
    httpError(res, error);
  }
};

module.exports = { getPropietarios, createPropietario, getPropietarioById, updatePropietario, deletePropietario, getPropietarioByFolio, updatePropietarioByFolio, deletePropietarioByFolio};
