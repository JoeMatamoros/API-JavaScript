const Producto = require('../model/modelProducto');

/*LISTAR PRODUCTOS */
exports.listarproducto = async(req, res) =>{
    const listarproducto = await Producto.findAll();
    if(listarproducto){
        res.json(listarproducto);

    }else{
        res.send('No existe producto');
    }
}

/*GUARDAR */
exports.guadar = async(req, res) =>{
    const{ NombreProducto, Precio, Talla, Existencia, Descripcion, IdMarca, IdCategoria, IdCatalogo, IdCategoriaEdades } = req.body;

    if(NombreProducto && Precio && Talla && Existencia && Descripcion && IdMarca && IdCategoria && IdCatalogo && IdCategoriaEdades){

        var nuevoProducto = await Producto.create({
            NombreProducto: NombreProducto,
            Precio: Precio,
            Talla: Talla,
            Existencia: Existencia,
            Descripcion: Descripcion,
            IdMarca: IdMarca,
            IdCategoria: IdCategoria,
            IdCatalogo: IdCatalogo,
            IdCategoriaEdades: IdCategoriaEdades
        });
        res.json(nuevoProducto);

    }else {
        res.send('Datos incompletos');
    }
}
/*ELIMINAR */
exports.eliminar = async (req, res) =>{
    const {IdProducto} = req.params;
    if(IdProducto){
        const busProducto = await Producto.findOne({
            where: {IdProducto: IdProducto}
        });
        console.log(busProducto);
        if(busProducto){
            await Producto.destroy({
                where:{ IdProducto:IdProducto }

            }).then((result) => {
                console.log(result);
                res.send("Producto eliminado");
            }).catch((error) => {
                console.log(error)
                res.send("Error");
            });
        }else{
            res.send('El producto no existe'); 
        }
    }else{
        res.send('Algo sucedió mal, Intente otra vez.');
    }

}
/*ACTUALIZAR */
exports.actualizar = async (req, res) =>{
    const {IdProducto} = req.params;
    const{ NombreProducto, Precio, Talla, Existencia, Descripcion, IdMarca, IdCategoria, IdCatalogo, IdCategoriaEdades } = req.body;
    var mensajes = [];
    if(!NombreProducto){
        mensajes.push({mensaje: "Falta nombre de producto"});
    }

    if(!Precio){
        mensajes.push({ mensaje:"Falta precio"});
    }

    if(!Existencia){
        mensajes.push({mensaje: "Falta existencia"});
    }

    if(mensajes.length){
        res.status(400).json(mensajes);
    }else{
        const busProducto = await Producto.findOne({
            where: {IdProducto:IdProducto}
        });
        if(!busProducto){
            res.status(400).json({mensaje: "El id del producto no existe."});
        }else{
            busProducto.NombreProducto = NombreProducto;
            busProducto.Precio = Precio;
            busProducto.Talla = Talla;
            busProducto.Existencia = Existencia;
            busProducto.Descripcion = Descripcion;
            busProducto.IdMarca = IdMarca;
            busProducto.IdCategoria = IdCategoria;
            busProducto.IdCatalogo = IdCatalogo;
            busProducto.IdCategoriaEdades = IdCategoriaEdades;

            await busProducto.save();
            res.json(busProducto);
            
        }
    }
}