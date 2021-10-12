const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const Usuarios = db.define(
    "usuarios",
    {
        IdUsuario:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
            validate:{
                is:{
                    args: [/^[0-9]+$/],
                    msg: "ID del cliente invalido." 
                }
            }
        },
        NombreUsuario:{
            type:Sequelize.STRING(45),
            allowNull: false,
        },
        Correo:{
            type:Sequelize.STRING(255),
            allowNull: false,
        },
        Contrasena:{
            type:Sequelize.STRING(255),
            allowNull: false,
        },
        IdTipoUsuario:{
            type:Sequelize.INTEGER,
            allowNull: false,
        },

    },
    {
        tableName:"usuarios",
        timestamps: false,
        hooks:{
            beforeCreate(usuarios){
                const hash = bcrypt.hashSync(usuarios.Contrasena,10);
                usuarios.Contrasena = hash;
            },
            beforeUpdate(usuarios){
                const hash = bcrypt.hashSync(usuarios.Contrasena,10);
                usuarios.Contrasena = hash;
            }
        }
    }
);
Usuarios.prototype.verificarContrasena = (con,com) =>{
    return bcrypt.compareSync(con, com);
}

module.exports = Usuarios;