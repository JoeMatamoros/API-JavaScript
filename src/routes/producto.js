const { Router } = require('express');
const router = Router();
const controladorProducto = require('../controllers/controllerproducto');

router.get('/', controladorProducto.listarproducto);
router.post('/',controladorProducto.guadar);
router.delete('/:IdProducto', controladorProducto.eliminar);
router.put('/:IdProducto')
module.exports = router;