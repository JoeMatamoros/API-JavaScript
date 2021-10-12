const Catalogo = require('../model/catalogo');

exports.listaCatalogo = async(req, res) =>{
    const listaCatalogo = await Catalogo.findAll();
    if(listaCatalogo){
        res.json(listaCatalogo);
    }else{
        res.send('No existen catalogos.');
    }
}
/** */
exports.guardar = async(req, res)=>{
    const {DescripcionCatalogo} = req.body;
    if(DescripcionCatalogo){
        var nuevoCatalogo = await Catalogo.create({
            DescripcionCatalogo:DescripcionCatalogo
        });
        res.json(nuevoCatalogo);
    }else{
        res.send('Datos incompletos');
    }
}

/** */
exports.eliminar =async (req, res)=>{
    const {IdCatalogo} = req.params;

    if(IdCatalogo){
        const busCatalogo = await Catalogo.findOne({
            where:{ IdCatalogo:IdCatalogo }
        });
        console.log(busCatalogo);

        if(busCatalogo){
            await Catalogo.destroy({
                where:{ IdCatalogo:IdCatalogo }

            }).then((result) => {
                console.log(result);
                res.send("Catalogo eliminado");
            }).catch((error) => {
                console.log(error)
                res.send("Error");
            });
        } else{
            res.send('El catalogo no existe');
        }

    }else{
        res.send('Datos incompletos');
    }
}

/** */
exports.actualizar = async (req, res) =>{
    const {IdCatalogo} = req.params;
    const {DescripcionCatalogo} = req.body;
    var mensajes =[];

    if(!DescripcionCatalogo){
        mensajes.push({mensajes:"Falta nombre de catalogo"});
    }

    if(mensajes.length){
        res.status(400).json(mensajes);
    }else{
        const busCatalogo = await Catalogo.findOne({
            where: {IdCatalogo:IdCatalogo}
        });
        if(!busCatalogo){
            res.status(400).json({mensaje: "El id del catalogo no existe."});
        }else{
            busCatalogo.DescripcionCatalogo=DescripcionCatalogo;

            await busCatalogo.save();
            res.json(busCatalogo);
        }
    }
}