const {Router} = require('express');
const passport = require('passport');
const router = Router();
const controladorUsuarios = require('../controllers/controllerusuario');

router.get('/',validarAutenticado, controladorUsuarios.listarUsuarios);
router.post('/', controladorUsuarios.guardar);
router.delete('/:IdUsuario',controladorUsuarios.eliminar);
router.put('/:IdUsuario',controladorUsuarios.actualizar);
/** */
router.post('/inicio/', passport.authenticate('inicio-local',{ successRedirect:'/api/usuario/', failureRedirect:'/api/usuario/error/'}),);
router.get('/cerrarsesion/',(req, res, next)=>{
    req.logout();
    res.redirect('/api/');
});
router.get('/error/',(req, res)=>{
    console.log(req);
    res.send('Los datos son invalidos');
});
/*RECUPERACION DE CONTRASEÑA*/
router.post('/recuperarContrasena/', controladorUsuarios.recuperarContrasena);

/*FUNCION DE VALIDACION DE USERS */
function validarAutenticado(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/api/');
}
module.exports = router;