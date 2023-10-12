const express = require('express');
const router = express.Router();
//const checkOrigin = require('../middleware/origin');
const { getPersonas, createPersona, getPersonaById, updatePersona, deletePersona, updatePersonaByRFC, deletePersonaByRFC, getPersonaByRFC, } = require('../controllers/controladorPersona');

/*** Rutas principales ***/

router.get('/', getPersonas);
router.post('/', createPersona);

/*** Rutas CRUD por ID ***/

/*
router.get('/:id', getPersonaById);
router.put('/:id', updatePersona);
router.delete('/:id', deletePersona);
*/

/*** Rutas CRUD por RFC ***/

router.get('/:rfc', getPersonaByRFC);
router.put('/:rfc', updatePersonaByRFC);
router.delete('/:rfc', deletePersonaByRFC);

module.exports = router;


