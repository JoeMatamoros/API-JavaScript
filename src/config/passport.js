const passport = require('passport');
const Usuarios = require('../model/modelUsuario');
const EstrategiaLocal = require('passport-local').Strategy;

/*SERIALIZACION */
passport.serializeUser((user, done)=>{
    console.log(user);
    done(null, user.IdUsuario);
});
/*CONTRARIO */
passport.deserializeUser(async(IdUsuario, done)=>{
    console.log(IdUsuario);
    const user = await Usuarios.findByPk(IdUsuario);
    done(null, user);
});
/** */
passport.use('inicio-local', new EstrategiaLocal({
    usernameField:'Correo',
    passwordField: 'Contrasena',
    passReqToCallback: true,

}, async(req, Correo, Contrasena, done)=>{
    const user = await Usuarios.findOne({where:{Correo: Correo}});
    if(user.verificarContrasena(Contrasena, user.Contrasena)){
        console.log('Contrasena correcta');
        done(null, user);
    }else{
        console.log('Contrasena erronea'+user.Contrasena);
        done(null, false);
    }
}));