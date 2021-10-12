const {Router} = require('express');
const router = Router();
const controladorTipoUsuario = require('../controllers/controllertipousuario');

router.get('/', controladorTipoUsuario.listaTipoUsuario);
router.post('/',controladorTipoUsuario.guardar);
router.delete('/:IdTipoUsuario',controladorTipoUsuario.eliminar);
router.put('/:IdTipoUsuario', controladorTipoUsuario.actualizar);

module.exports = router;