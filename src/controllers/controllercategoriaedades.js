const CategoriaEdades = require('../model/categoriaedades');

/*LISTAR CATEGORIAS*/
exports.listarcategoriaedades = async(req, res) =>{
    const listarcategoriaedades = await CategoriaEdades.findAll();
    if(listarcategoriaedades){
        res.json(listarcategoriaedades);
    }else{
        res.send('No existen categorias para edades.');
    }
}
/*GUARDAR CATEGORIAS EDADES */
exports.guardar = async(req, res) =>{
    const{ DescripcionEdades, IdPublico } = req.body;
    if(DescripcionEdades && IdPublico){
        var nuevaCategoriaEdades = await CategoriaEdades.create({
            DescripcionEdades: DescripcionEdades,
            IdPublico:IdPublico
        });
        res.json(nuevaCategoriaEdades);
    } else{
        res.send('Datos incompletos');
    }
}
/*ELIMINAR */
exports.eliminar = async (req, res) =>{
    const {IdCategoria} = req.params;

    if(IdCategoria){
        const busCategoriaEdades = await CategoriaEdades.findOne({
            where: { IdCategoria: IdCategoria}
        });
        console.log(busCategoriaEdades);

        if(busCategoriaEdades){
            await CategoriaEdades.destroy({
                where:{ IdCategoria:IdCategoria }

            }).then((result) => {
                console.log(result);
                res.send("Categoria de edad eliminada.");
            }).catch((error) => {
                console.log(error)
                res.send("Error");
            });
        } else{
            res.send('La Categoria de edad no existe.');
        }
    }else{
        res.send('Datos incompletos');
    }
}
/*ACTUALIZAR */
exports.actualizar = async (req, res) =>{
    const {IdCategoria} = req.params;
    const { DescripcionEdades, IdPublico }= req.body;
    var mensajes = [];

    if(!DescripcionEdades){
        mensajes.push({ mensaje: "Falta Descripcion de Categoria"});
    }

    if(mensajes.length){
        res.status(400).json(mensajes);
    } else {
        const busCategoriaEdades = await CategoriaEdades.findOne({
            where: {IdCategoria: IdCategoria}
        });

        if(!busCategoriaEdades){
            res.status(400).json({mensaje: "El id de la CE no existe."});
        } else {
            busCategoriaEdades.DescripcionEdades = DescripcionEdades;
            busCategoriaEdades.IdPublico = IdPublico;

            await busCategoriaEdades.save();
            res.json(busCategoriaEdades);
        }
    }

}