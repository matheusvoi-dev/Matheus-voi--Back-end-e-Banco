const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.urlencoded({ extended: true }));
const db = new sqlite3.Database('./seu_nome.db'); // Use o nome exato do seu arquivo
app.post('/salvar', (req, res) => {
const { nome, telefone, email } = req.body;
const sql = `INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)`;

db.run(sql, [nome, telefone, email], function(err) {
if (err) return res.send("Erro: " + err.message);
res.send("<h1>Sucesso!</h1><p>Contato salvo no banco.</p><a href='/'>Voltar</a>");
});
});
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));