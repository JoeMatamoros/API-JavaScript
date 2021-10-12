const Sequelize = require('sequelize');
const db = require('../config/db');
const Publico = db.define(
    "publico",
    {
     IdPublico:{ 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
    },
    DescripcionPublico:{
            type:Sequelize.STRING(255),
            allowNull: false,
        },   
    },
    {
        tableName:"publico",
        timestamps:false,
    }
);

module.exports = Publico;