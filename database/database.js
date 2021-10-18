const sequelize = require("sequelize");

const connection = new sequelize("guia_perguntas","root","mowmow21",{
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;