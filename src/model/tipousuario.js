const Sequelize = require('sequelize');
const db = require('../config/db');
const TipoUsuario = db.define(
    "tipousuario",
    {
        IdTipoUsuario:{ 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
    },
    Descripcion:{
            type:Sequelize.STRING(45),
            allowNull: false,
        },
    },
    {
        tableName:"tipousuario",
        timestamps:false
    }
);

module.exports = TipoUsuario;