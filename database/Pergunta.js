const Sequelize = require("sequelize");
const connection = require("./database");

const perguntadb = connection.define("pergunta", {
	titulo: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	descricao: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
});

perguntadb.sync({ force: false }).then(() => {
	console.log("Tabela Criada com sucesso");
});

module.exports = perguntadb;
