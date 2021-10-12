const { Router } = require('express');
const router = Router();
const controladorcategoria = require('../controllers/controllercategoria')
//const listaproductos = require('../data/empleados.json')

router.get('/', controladorcategoria.listacategoria);
router.post('/', controladorcategoria.guardar);
router.delete('/:IdCategoria', controladorcategoria.eliminar);
router.put('/:IdCategoria', controladorcategoria.editar);

module.exports=router;