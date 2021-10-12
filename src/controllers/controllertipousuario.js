const TipoUsuario = require('../model/tipousuario');
/* */
exports.listaTipoUsuario = async(req, res) =>{
    const listaTipoUsuario = await TipoUsuario.findAll();
    if(listaTipoUsuario){
        res.json(listaTipoUsuario);
    }else{
        res.send('No exiten tipos de usuarios todavía');
    }
}

/** */
exports.guardar = async(req, res) =>{
    const {Descripcion} = req.body;
    if(Descripcion){
        var nuevoTipoUsuario = await TipoUsuario.create({
            Descripcion:Descripcion
        });
        res.json(nuevoTipoUsuario);
    }else{
        res.send('Datos incompletos');
    }
}
/** */
exports.eliminar = async(req, res) =>{
    const {IdTipoUsuario} = req.params;
    if(IdTipoUsuario){
        const busTipoUsuario = await TipoUsuario.findOne({
            where:{IdTipoUsuario: IdTipoUsuario}
        });
        console.log(busTipoUsuario);

        if(busTipoUsuario){
            await TipoUsuario.destroy({
                where:{IdTipoUsuario: IdTipoUsuario}

            }).then((result) => {
                console.log(result);
                res.send("Tipo de usuario eliminado");
            }).catch((error) => {
                console.log(error)
                res.send("Error");
            });

        }else{
            res.send('El tipo de usuario no existe');
        }
    }else {
        res.send('Datos incompletos');
    }
}

/** */
exports.actualizar = async(req, res) =>{
    const {IdTipoUsuario} = req.params;
    const {Descripcion} = req.body;
    var mensajes = [];

    if(!Descripcion){
        mensajes.push({mensaje: "Falta la descripcion de tipo de usuario"});
    }

    if(mensajes.length){
        res.status(400).json(mensajes);
    } else{
        const busTipoUsuario = await TipoUsuario.findOne({
            where:{IdTipoUsuario: IdTipoUsuario}
        });

        if(!busTipoUsuario){
            res.status(400).json({mensaje: "El id del tipo de usuario no existe."})
        } else{
            busTipoUsuario.Descripcion = Descripcion;

            await busTipoUsuario.save();
            res.json(busTipoUsuario);
        }
    }

}