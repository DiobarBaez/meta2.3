const Arrendatario = require('../models/arrendatario');
const { httpError } = require('../helpers/handleError');

/********** FUNCIONES PRINCIPALES **********/

// Obtener todos los arrendatarios
const getArrendatarios = async (req, res) => {
  try {
    const arrendatarios = await Arrendatario.find();
    res.json(arrendatarios);
  } catch (error) {
    httpError(res, error);
  }
};

// Crear un arrendatario
const createArrendatario = async (req, res) => {
  try {
    const { id, cve, rfc, folio } = req.body;

    // Verificar si ya existe un arrendatario para esa propiedad
    const arrendatarioExistente = await Arrendatario.findOne({ folio: folio });

    if (arrendatarioExistente) {
      return res.status(400).json({ message: 'Ya existe un arrendatario para esa propiedad.' });
    }

    const arrendatario = new Arrendatario({
      id,
      cve,
      rfc,
      folio,
    });

    const newArrendatario = await arrendatario.save();
    res.status(201).json({ data: newArrendatario });

  } catch (error) {
    httpError(res, error);
  }
};

/********** CRUD POR PROPIEDAD DE ID **********/

// Obtener un arrendatario por su ID
const getArrendatarioById = async (req, res) => {
  try {
    const arrendatario = await Arrendatario.findById(req.params.id);
    if (!arrendatario) {
      return res.status(404).json({ message: 'Arrendatario no encontrado' });
    }
    res.json(arrendatario);
  } catch (error) {
    httpError(res, error);
  }
};

// Actualizar un arrendatario por su ID
const updateArrendatario = async (req, res) => {
  try {
    const arrendatario = await Arrendatario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!arrendatario) {
      return res.status(404).json({ message: 'Arrendatario no encontrado' });
    }
    res.json(arrendatario);
  } catch (error) {
    httpError(res, error);
  }
};

// Eliminar un arrendatario por su ID
const deleteArrendatario = async (req, res) => {
  try {
    const arrendatario = await Arrendatario.findByIdAndRemove(req.params.id);
    if (!arrendatario) {
      return res.status(404).json({ message: 'Arrendatario no encontrado' });
    }
    res.json({ message: 'Arrendatario eliminado exitosamente' });
  } catch (error) {
    httpError(res, error);
  }
};

/********** CRUD POR PROPIEDAD DE RFC **********/

// Obtener arrendatarios por su RFC
const getArrendatariosByRFC = async (req, res) => {
  try {
    const cve = req.params.cve;
    const arrendatarios = await Arrendatario.find({ cve: cve });

    if (!arrendatarios || arrendatarios.length === 0) {
      return res.status(404).json({ message: 'Arrendatarios no encontrados para el CVE proporcionado' });
    }

    res.json(arrendatarios);
  } catch (error) {
    httpError(res, error);
  }
};

// Actualizar arrendatarios por su RFC
const updateArrendatariosByRFC = async (req, res) => {
  try {
    const cve = req.params.cve;
    const arrendatarios = await Arrendatario.updateMany({ cve: cve }, req.body, { new: true });

    if (!arrendatarios || arrendatarios.nModified === 0) {
      return res.status(404).json({ message: 'Arrendatarios no encontrados para el CVE proporcionado' });
    }

    res.json({ message: 'Arrendatarios actualizados exitosamente' });
  } catch (error) {
    httpError(res, error);
  }
};

// Eliminar arrendatarios por su RFC
const deleteArrendatariosByRFC = async (req, res) => {
  try {
    const cve = req.params.cve;
    const arrendatarios = await Arrendatario.deleteMany({ cve: cve });

    if (!arrendatarios || arrendatarios.deletedCount === 0) {
      return res.status(404).json({ message: 'Arrendatarios no encontrados para el CVE proporcionado' });
    }

    res.json({ message: 'Arrendatarios eliminados exitosamente' });
  } catch (error) {
    httpError(res, error);
  }
};

module.exports = { getArrendatarios, createArrendatario, getArrendatarioById, updateArrendatario, deleteArrendatario, getArrendatariosByRFC, updateArrendatariosByRFC, deleteArrendatariosByRFC };
