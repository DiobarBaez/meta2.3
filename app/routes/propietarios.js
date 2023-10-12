const express = require('express');
const router = express.Router();
const checkOrigin = require('../middleware/origin');
const {getPropietarios, createPropietario, getPropietarioById, updatePropietario, deletePropietario, getPropietarioByFolio, updatePropietarioByFolio, deletePropietarioByFolio, } = require("../controllers/controladorPropietario");

/*** Rutas principales ***/

router.get('/', getPropietarios);
router.post('/', createPropietario);

/*** Rutas CRUD por ID ***/

/*
router.get('/:id', getPropietarioById);
router.put('/:id', updatePropietario);
router.delete('/:id', deletePropietario);
*/

/*** Rutas CRUD por RFC ***/

router.get('/:folio', getPropietarioByFolio);
router.put('/:folio', updatePropietarioByFolio);
router.delete('/:folio', deletePropietarioByFolio);

module.exports = router;


