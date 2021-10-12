const Sequelize = require('sequelize');
const db = require('../config/db');
const Catalogo = db.define(
    "catalogo",
    {
        IdCatalogo:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        DescripcionCatalogo:{
            type: Sequelize.STRING(15),
            allowNull: false,
        },
    },
    {
        tableName: "catalogo",
        timestamps: false,
    }
);

module.exports = Catalogo;