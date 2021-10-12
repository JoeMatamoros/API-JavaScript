const jwt = require('jsonwebtoken');
const moment = require('moment');
const passport = require('passport');
const estrategiaLocal = require('passport-local').Strategy;
const Usuarios = require('../model/modelUsuario');
const expiracion = moment.duration(10, "seconds").asSeconds();

passport.use(new estrategiaLocal({
    usernameField: 'Correo',
    passwordField:'Contrasena',
    session: false
}, async (username, password, done) =>{
    await Usuarios.findOne({where:{Correo: username}}).then((data)=>{
        if(data){
            const user = { id: data.id, nombre: data.nombre };
            return done(null, user)
        } else {
            return done(null, false)
        }
    }).catch((err)=>{
        console.log(err);
        return done(err)
    });
}
));
/* */
passport.serializeUser((user, done)=>{
    done(null, user.id);
});
/** */
passport.deserializeUser((id, done)=>{
    Usuarios.findOne({id: id},(err, user)=>{
        if(err) {done(err);}
        done(null, user);
    });
});


module.exports = passport;
