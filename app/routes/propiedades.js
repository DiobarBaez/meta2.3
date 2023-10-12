const express = require('express');
const router = express.Router();
const checkOrigin = require('../middleware/origin');
const { getPropiedades, createPropiedad, getPropiedadById, updatePropiedad, deletePropiedad, getPropiedadByCve, updatePropiedadByCve, deletePropiedadByCve } = require('../controllers/controladorPropiedad');

/*** Rutas principales ***/

router.get('/', getPropiedades);
router.post('/', createPropiedad);

/*** Rutas CRUD por ID ***/

/*
router.get('/:id', getPropiedadById);
router.put('/:id', updatePropiedad);
router.delete('/:id', deletePropiedad);
*/

/*** Rutas CRUD por CVE_CATASTRAL ***/

router.get('/:cve_catastral', getPropiedadByCve);
router.put('/:cve_catastral', updatePropiedadByCve);
router.delete('/:cve_catastral', deletePropiedadByCve);

module.exports = router;


