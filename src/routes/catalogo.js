const {Router} = require('express');
const router = Router();
const controladorCatalogo = require('../controllers/controllercatalogo');

router.get('/', controladorCatalogo.listaCatalogo);
router.post('/',controladorCatalogo.guardar);
router.delete('/:IdCatalogo',controladorCatalogo.eliminar);
router.put('/:IdCatalogo',controladorCatalogo.actualizar);

module.exports = router;