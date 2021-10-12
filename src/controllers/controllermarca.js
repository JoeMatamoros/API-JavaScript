const Marca = require('../model/marca');

/*LISTAR MARCAS */
exports.listamarca = async(req, res) =>{
    const listamarca = await Marca.findAll();
    if(listamarca){
        res.json(listamarca);
    }else{
        res.send('No existen marcas.');
    }
}
/*GUARDAR MARCAS */
exports.guardar = async(req, res) =>{
    const {NombreMarca} = req.body;
    if(NombreMarca){
        var nuevaMarca = await Marca.create({
            NombreMarca:NombreMarca
        });
        res.json(nuevaMarca);
    } else{
        res.send('Datos incompletos');
    }
}
/*ELIMINAR MARCAS */
exports.eliminar = async (req, res) =>{
    const {IdMarca} = req.params;
    if(IdMarca){
        const busMarca = await Marca.findOne({
            where:{ IdMarca:IdMarca }
        });
        console.log(busMarca);

        if(busMarca){
            await Marca.destroy({
                where:{ IdMarca:IdMarca }

            }).then((result) => {
                console.log(result);
                res.send("Marca eliminada");
            }).catch((error) => {
                console.log(error)
                res.send("Error");
            });
        } else{
            res.send('La marca no existe');
        }
    }else{
        res.send('Datos incompletos');
    }
}
/*EDITAR MARCAS */
exports.actualizar = async(req, res) =>{
    const { IdMarca } = req.params;
    const{ NombreMarca } = req.body;
    var mensajes = [];

    if(!NombreMarca){
        mensajes.push({mensaje: "Falta nombre de la marca"});
    }

    if(mensajes.length){
        res.status(400).json(mensajes);
    } else{
        const busMarca = await Marca.findOne({
            where:{IdMarca: IdMarca}
        });
        if(!busMarca){
            res.status(400).json({mensaje: "El id de la marca no existe."});
        }else{
            busMarca.NombreMarca =NombreMarca;

            await busMarca.save();
            res.json(busMarca);
        }
    }
   
}