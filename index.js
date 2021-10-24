const express = require("express");

const app = express();
const bodyParser = require("body-parser");

const tblPergunta = require("./database/Pergunta");
const tblResposta = require("./database/Resposta");
const connection = require("./database/database");

connection.authenticate().then(() => {
	console.log("Conexão feita");
}).catch((erro) => {
	console.log(erro);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, resp) => {
	tblPergunta.findAll({ raw: true, order: [["id", "desc"]] }).then((pergunta) => {
		resp.render("index", {
			pergunta,
		});
	});
});

app.get("/perguntas", (req, resp) => {
	resp.render("perguntas");
});

app.post("/salvarPerguntas", (req, resp) => {
	const titulo = req.body.ttl;
	const { descricao } = req.body;
	tblPergunta.create({
		titulo,
		descricao,
	}).then(() => {
		console.log("Registro inserido com sucesso");
		resp.redirect("/");
	});

	/* resp.render(); */
});

app.get("/pergunta/:id", (req, resp) => {
	// eslint-disable-next-line prefer-destructuring
	const id = req.params.id;
	console.log(`O id é ${id}`);
	tblPergunta.findOne({
		where: { id },
	}).then((pergunta) => {
		if (pergunta != undefined) {
			tblResposta.findAll({
				where: { perguntaID: pergunta.id },

			}).then((respostas) => {
				resp.render("pergunta", {
					pergunta,
					respostas,
				});
			});
		} else {
			resp.redirect("/");
		}
	});
});

app.listen(3001, () => {
	console.log("App rodando");
});

app.post("/responder", (req, resp) => {
	// eslint-disable-next-line prefer-destructuring
	const corpo = req.body.corpo;
	console.log(corpo);
	const perguntaId = req.body.pergunta;
	console.log(perguntaId);
	tblResposta.create({
		corpo,
		perguntaId,
	}).then(() => {
		console.log("Inseriu a tabela respostas");
		// eslint-disable-next-line quotes
		// eslint-disable-next-line prefer-template
		resp.redirect("/pergunta/" + perguntaId);
	});
});
