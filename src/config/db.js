const Sequelize = require('sequelize');
const db = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USUARIO,
    process.env.MYSQL_CONTRASENA,
     {
        host: 'localhost',//servidor
        dialect: 'mysql',//DBMS
        port: '3306',//puerto
    },
);
module.exports = db;