const { validationResult } = require('express-validator');
const Usuarios = require('../model/modelUsuario');
const EnviarCorreo = require('../config/correo');

exports.listarUsuarios = async(req, res) =>{
    const listarUsuarios = await Usuarios.findAll();
    if(listarUsuarios){
        res.json(listarUsuarios);
    }else{
        res.send('No hay registros de usuarios.')
    }
}

/*GUARDAR CON bcrypt INCLUIDO */
exports.guardar = async (req, res) => {
    const {NombreUsuario, Correo, Contrasena, IdTipoUsuario} = req.body;
    var menasjes = { mensaje:"Datos procesados", data:[] };

    if(NombreUsuario && Correo && Contrasena && IdTipoUsuario){
        var nuevoUsuario = await Usuarios.create({
            NombreUsuario: NombreUsuario,
            Correo: Correo,
            Contrasena: Contrasena,
            IdTipoUsuario: IdTipoUsuario
        }).then((data)=>{
            menasjes.data = data
            res.status(200).json(menasjes);
        }).catch((error) =>{
            menasjes.data = error
            res.status(200).json(menasjes);
        });
    }else{
        res.send('Algo sucedió mal, Intente de nuevo.');
        res.status(200).json(menasjes);
    }
   
}
/*ELIMINAR */
exports.eliminar = async(req, res)=>{
    const {IdUsuario} = req.params;
    var mensajes = {mensaje:"Datos procesados correctamente", data:[] };

    if(IdUsuario){
        const busUsuario = await Usuarios.findOne({
            where:{IdUsuario: IdUsuario}
        });

        if(busUsuario){

            await Usuarios.destroy({
                where:{
                    IdUsuario: IdUsuario,
                }
            }).then((result)=>{
                console.log(result);
                mensajes.mensaje="Usuario eliminado.";
                mensajes.data=result
                res.status(200).json(mensajes);
            }).catch((error)=>{
                mensajes.mensaje="Error al actualizar los datos";
                res.status(200).json(mensajes);
            });
            
        } else{
            res.send('No existe el Id');
            res.status(200).json(mensajes);
        }

    } else{
        mensajes.mensaje ="Faltan alguno datos para la petición";
        res.status(200).json(mensajes);
    }
}
/*ACTUALIZAR */
exports.actualizar = async (req, res) =>{
    const {IdUsuario} =req.params;
    const {NombreUsuario, Correo ,Contrasena, IdTipoUsuario} = req.body;
    var mensajes = {mensaje:"Datos procesados correctamente", data:[] };

    const busUsuario = await Usuarios.findOne({
        where:{IdUsuario: IdUsuario }
    });

    if(busUsuario){
        busUsuario.NombreUsuario = NombreUsuario;
        busUsuario.Correo = Correo;
        busUsuario.Contrasena = Contrasena;
        busUsuario.IdTipoUsuario = IdTipoUsuario;

        await busUsuario.save();
        mensajes.data = busUsuario;
    } else {
        mensajes.mensaje="El usuario no existe"
    }
    res.status(200).json(mensajes);
}
/*INICIO DE SESION */
exports.inicioSesion = async(req, res, next) =>{
    const validacion = validationResult(req);
    var mensajes = {mensaje:"Datos procesados correctamente", data:[] };

    if(!validacion.isEmpty()){
        mensajes.mensaje ="Los datos ingresados no son validos"
        mensajes.data = validacion.array();
    }
    return next(req, mensajes); 

}
/*RECUPERAR CONTRASEÑA */
exports.recuperarContrasena = async(req, res, next) =>{
    const {Correo} = req.body;
    var busUsuario =  await Usuarios.findOne({
        where:{ Correo: Correo}
    });
    const nuevaContrasena='123456';
    if(busUsuario){
        busUsuario.Contrasena = nuevaContrasena;
        await busUsuario.save();
    }
    const data = {
        Correo: busUsuario.Correo,
        Contrasena: nuevaContrasena,
    }
    EnviarCorreo.recuperarContrasena(data);
    res.send("Correo enviado.");
} 