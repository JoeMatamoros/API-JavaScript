const {Router} = require('express');
const router = Router();
const controladoCategoriaEdades = require('../controllers/controllercategoriaedades');
const CategoriaEdades = require('../model/categoriaedades');

router.get('/', controladoCategoriaEdades.listarcategoriaedades);
router.post('/',controladoCategoriaEdades.guardar);
router.delete('/:IdCategoria', controladoCategoriaEdades.eliminar);
router.put('/:IdCategoria', controladoCategoriaEdades.actualizar);
module.exports = router;