const Sequelize = require('sequelize');
const db = require('../config/db');
const Categoria = db.define(
    "categoria",
    {
        IdCategoria:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        DescripcionCategoria:{
            type: Sequelize.STRING(15),
            allowNull: true,
        },
       
    }, 
    {
        tableName: "categoria",
        timestamps: false,
    }
);
module.exports=Categoria;