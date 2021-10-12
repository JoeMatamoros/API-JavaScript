const Sequelize = require('sequelize');
const db = require('../config/db');
const Marca = db.define(
"marca",
    {
        IdMarca:{ 
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true,
                allowNull:false,
        },
        NombreMarca:{
            type:Sequelize.STRING(45),
            allowNull: false,
        },
    },
    {
        tableName:"marca",
        timestamps:false,
    }
);
module.exports = Marca;