const Sequelize = require('sequelize');
const db = require('../config/db');
const CategoriaEdades = db.define(
    "categoriaedades",
    {
        IdCategoria:{
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true,
                allowNull:false,
        },
        DescripcionEdades:{
                type:Sequelize.STRING(255),
                allowNull: false,
        },
        IdPublico:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName:"categoriaedades",
        timestamps:false,
    }
);

module.exports = CategoriaEdades;