const {Router} = require('express');
const router = Router();
const controladorPublico = require('../controllers/controllerpublico');

router.get('/',controladorPublico.listaPublico);
router.post('/',controladorPublico.guardar);
router.delete('/:IdPublico',controladorPublico.eliminar);
router.put('/:IdPublico',controladorPublico.actualizar);

module.exports = router;