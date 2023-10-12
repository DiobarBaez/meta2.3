const Persona = require('../models/persona');
const {httpError} = require('../helpers/handleError');


/**********   FUNCIONES PRINCIPALES   **********/


const getPersonas = async (req, res) => {
  try {
    const personas = await Persona.find();
    res.json(personas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPersona = async (req, res) => {
  const { rfc, nombre } = req.body;

  try {
    // Verificar si ya existe una persona con el mismo RFC
    const personaExistente = await Persona.findOne({ rfc: rfc });

    if (personaExistente) {
      return res.status(409).json({ message: 'Ya existe una persona con el mismo RFC' });
    }else{
      // Si no existe, crea una nueva persona
      const nuevaPersona = new Persona({ rfc, nombre });
      const personaGuardada = await nuevaPersona.save();
      res.status(201).json(personaGuardada);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};


/**********   CRUD POR PROPIEDAD DE ID   **********/


const getPersonaById = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);
    res.json(persona);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updatePersona = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);

    if (persona) {
      persona.rfc = req.body.rfc || persona.rfc;
      persona.nombre = req.body.nombre || persona.nombre;

      const personaActualizada = await persona.save();
      res.json(personaActualizada);
    } else {
      res.status(404).json({ message: 'Persona no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePersona = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);

    if (persona) {
      await persona.remove();
      res.json({ message: 'Persona eliminada' });
    } else {
      res.status(404).json({ message: 'Persona no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**********   CRUD POR PROPIEDAD DE RFC   **********/



const getPersonaByRFC = async (req, res) => {
  try {
    const rfc = req.params.rfc; // Asumo que el parámetro en la URL es 'rfc'
    const persona = await Persona.findOne({ rfc: rfc });

    if (!persona) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    res.json(persona);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una persona por su RFC
const updatePersonaByRFC = async (req, res) => {
  try {
    const rfc = req.params.rfc; // Asumo que el parámetro en la URL es 'rfc'
    const persona = await Persona.findOne({ rfc: rfc });

    if (persona) {
      persona.rfc = req.body.rfc || persona.rfc;
      persona.nombre = req.body.nombre || persona.nombre;

      const personaActualizada = await persona.save();
      res.json(personaActualizada);
    } else {
      res.status(404).json({ message: 'Persona no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una persona por su RFC
const deletePersonaByRFC = async (req, res) => {
  try {
    const rfc = req.params.rfc; // Asumo que el parámetro en la URL es 'rfc'
    
    // Buscar la persona por su RFC
    const persona = await Persona.findOne({ rfc: rfc });

    if (persona) {
      // Utilizar el método .deleteOne() para eliminar el documento
      await Persona.deleteOne({ rfc: rfc });
      res.json({ message: 'Persona eliminada' });
    } else {
      res.status(404).json({ message: 'Persona no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports =  { getPersonas, createPersona, getPersonaById, updatePersona, deletePersona, getPersonaByRFC, updatePersonaByRFC, deletePersonaByRFC, };