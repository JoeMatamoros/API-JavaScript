const Categoria = require('../model/categorias');

/*LISTAR CATEGORIAS */
exports.listacategoria = async (req, res) => {

    const listacategoria = await Categoria.findAll();
    if (listacategoria){
        res.json(listacategoria);

    }else{

        res.send('No existe categoria');
    }
};

/*GUARDAR CATEGORIA DE LA BDD */
exports.guardar = async (req, res) => {

    const {DescripcionCategoria} = req.body;
    if(DescripcionCategoria){

        var nuevacategoria = await Categoria.create({
            DescripcionCategoria:DescripcionCategoria
        });
        res.json(nuevacategoria);

    } else {
        res.send('Datos incompletos');
    }
};

/*ELIMINAR CATEGORIA DE LA BDD */
exports.eliminar = async (req, res)=> { 
    const { IdCategoria } = req.params;
    if(IdCategoria)
    {
        const buscategoria = await Categoria.findOne({
            where: {
                IdCategoria: IdCategoria
            }
        });
        console.log(buscategoria);
        if (buscategoria)
        {
            await categoria.destroy({
                where:{
                    IdCategoria: IdCategoria,
                }
            }).then((result)=>{
                console.log(result);
                res.send("Ejecutado");
            }).catch((error)=>{
                console.log(error)
                res.send("Error");
            });
            
        }
        else
        {
            res.send("La categoria no existe");
        }

    }
    else
    {
        res.send('Datos incompletos');
    }
};

/*ACTUALIZAR CATEGORIAS DE LA BDD */
exports.editar = async (req, res)=> {
    const { IdCategoria } = req.params;
    const { DescripcionCategoria} = req.body;
    var mensajes =[];
    if (!DescripcionCategoria)
    {
       mensajes.push({
           mensaje: "Escriba la categoria",
       });
    }
   
    if(mensajes.length)
    {
        res.status(400).json(mensajes);
    }
    else
    {
        const buscategoria = await Categoria.findOne({
            where: {
                IdCategoria: IdCategoria,
            }
        });
        if (!buscategoria)
        {
            res.status(400).json({
                mensaje:"El id de categoria no existe",
            });
        }
        else{
            
            buscategoria.DescripcionCategoria = DescripcionCategoria;
            await buscategoria.save();
            res.json(buscategoria);
        }
    }
};