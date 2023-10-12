const express = require('express');
const router = express.Router();
const checkOrigin = require('../middleware/origin');
const { getArrendatarios, createArrendatario, getArrendatarioById, updateArrendatario, deleteArrendatario, getArrendatariosByRFC, updateArrendatariosByRFC, deleteArrendatariosByRFC } = require('../controllers/controladorArrendatario');

/*** Rutas principales ***/

router.get('/', getArrendatarios);
router.post('/', createArrendatario);

/*** Rutas CRUD por ID ***/

/*
router.get('/:id', getArrendatarioById);
router.put('/:id', updateArrendatario);
router.delete('/:id', deleteArrendatario);
*/

/*** Rutas CRUD por RFC ***/

router.get('/:cve', getArrendatariosByRFC);
router.put('/:cve', updateArrendatariosByRFC);
router.delete('/:cve', deleteArrendatariosByRFC);

module.exports = router;


