const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
const db = new sqlite3.Database("./seu_banco.db"); // Use o nome exato do seu arquivo

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/salvar", (req, res) => {
const { nome, telefone, email } = req.body;
const sql = `INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)`;
db.run(sql, [nome, telefone, email], function (err) {
if (err) return res.send("Erro: " + err.message);
res.send(
"<h1>Sucesso!</h1><p>Contato salvo no banco.</p><a href='/'>Voltar</a>",
);
});
});
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));