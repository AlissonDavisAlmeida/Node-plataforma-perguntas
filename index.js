

const express = require("express");
const app = express();
const tblPergunta = require("./database/Pergunta");

const connection = require("./database/database")

connection.authenticate().then(() => {
    console.log("Conexão feita");
}).catch((erro) => {
    console.log(erro);
});

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, resp) => {

    tblPergunta.findAll({raw: true}).then(pergunta=>{
        resp.render("index", {
            pergunta : pergunta
        });
    });
    
    
})

app.get("/perguntas", (req, resp) => {
    resp.render("perguntas");
})

app.post("/salvarPerguntas", (req, resp) => {
    var titulo = req.body.ttl;
    var descricao = req.body.descricao;
    tblPergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {

        console.log("Registro inserido com sucesso")
        resp.redirect("/")
    });


    /* resp.render(); */
})






app.listen(3001, () => {
    console.log("App rodando");
});