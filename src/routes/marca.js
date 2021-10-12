const {Router} = require('express');
const router = Router();
const controladorMarca = require('../controllers/controllermarca');

router.get('/', controladorMarca.listamarca);
router.post('/',controladorMarca.guardar);
router.delete('/:IdMarca',controladorMarca.eliminar);
router.put('/:IdMarca',controladorMarca.actualizar);


module.exports = router;