const Sequelize = require('sequelize');
const db = require('../config/db');
const Producto = db.define(
    "producto",
    {
        IdProducto:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
        },
        NombreProducto:{
            type:Sequelize.STRING(45),
            allowNull: false,
        },
        Precio:{
            type:Sequelize.DOUBLE,
            allowNull: false,
        },
        Talla:{
            type:Sequelize.STRING(10),
            allowNull: false,
        },
        Existencia:{
            type:Sequelize.INTEGER,
            allowNull: false,
        },
        Descripcion:{
            type:Sequelize.STRING(255),
            allowNull: false,
        },
        IdMarca:{
            type:Sequelize.INTEGER,
            allowNull: false,
        },
        IdCategoria:{
            type:Sequelize.INTEGER,
            allowNull: false,
        },
        IdCatalogo:{
            type:Sequelize.INTEGER,
            allowNull: false,
        },
        IdCategoriaEdades:{
            type:Sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName:"producto",
        timestamps: false,
    }
);

module.exports = Producto;