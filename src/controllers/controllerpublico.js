const Publico = require('../model/modelPublico');

exports.listaPublico = async(req, res) =>{
    const listaPublico = await Publico.findAll();
    if(listaPublico){
        res.json(listaPublico);
    }else{
        res.send('No existen publicos');
    }
}

/** */
exports.guardar = async(req, res)=>{
    const{DescripcionPublico} = req.body;
    if(DescripcionPublico){
        var nuevoPublico = await Publico.create({
            DescripcionPublico:DescripcionPublico
        });
        res.json(nuevoPublico);
    }else{
        res.send('Datos incompletos');
    }
}
/** */

exports.eliminar=async (req, res) =>{
    const{IdPublico} = req.params;
    if(IdPublico){
        const busPublico = await Publico.findOne({
            where:{IdPublico:IdPublico}
        });
        console.log(busPublico);

        if(busPublico){
            await Publico.destroy({
                where:{ IdPublico:IdPublico }

            }).then((result) => {
                console.log(result);
                res.send("Publico eliminado");
            }).catch((error) => {
                console.log(error)
                res.send("Error");
            });
        } else{
            res.send('El publico no existe');
        }

    }else{
        res.send('Datos incompletos');
    }

}

/** */
exports.actualizar = async (req, res) =>{
    const {IdPublico} = req.params;
    const {DescripcionPublico} = req.body;
    var mensajes =[];

    if(!DescripcionPublico){
        mensajes.push({mensaje:"Falta descripcion del publico"});
    }

    if(mensajes.length){
        res.status(400).json(mensajes);
    }else{
        const busPublico = await Publico.findOne({
            where:{ IdPublico:IdPublico }
        });
        if(!busPublico){
            res.status(400).json({mensaje: "El id del publico no existe."});
        }else{
            busPublico.DescripcionPublico = DescripcionPublico;

            await busPublico.save();
            res.json(busPublico);
        }
    }
}