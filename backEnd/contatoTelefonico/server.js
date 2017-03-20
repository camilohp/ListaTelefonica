var express = require('express');
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var contatos = [
				{nome: "Pedro", telefone: "99998888", cor: "blue", data: new Date(), operadora: {nome: "Oi", codigo: 31, categoria: "Celular"}},
				{nome: "Ana", telefone: "99998877", cor: "red", data: new Date(), operadora: {nome: "Tim", codigo: 41 , categoria: "Celular"}},
				{nome: "Maria", telefone: "99998866", cor: "yellow", data: new Date(), operadora: {nome: "Vivo", codigo: 15 , categoria: "Celular"}}
			];

var operadoras = [
				{nome: "Oi", codigo: 31, categoria: "Celular", preco: 2},
				{nome: "Tim", codigo: 41 , categoria: "Celular", preco: 3},
				{nome: "Vivo", codigo: 15 , categoria: "Celular", preco: 1},
				{nome: "GVT", codigo: 25 , categoria: "Fixo", preco: 3},
				{nome: "Embratel", codigo: 21 , categoria: "Fixo", preco: 1.1}
			];

app.listen(process.env.PORT || 8081);

console.log("##################################################");
console.log("Cosulta Telefonica - Inicializando servico NodeJS");
console.log("##################################################\n\n\n");

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/contatos', function(req, res) {
  res.json(contatos);	
  console.log("##################################################");
  console.log("[GET] Contatos - Listar - Response Body:\n %s",  JSON.stringify(contatos, null, 3));
  console.log("##################################################");
});

app.post('/contatos', function(req, res) {
  console.log("##################################################");
  console.log("[POST] Contatos - Adicionar - Request Body:\n %s", JSON.stringify(req.body, null, 3));
  console.log("##################################################");
  req.body.data = new Date();
  contatos.push(req.body);
  res.json(req.body);
});

app.get('/operadoras', function(req, res) {
  res.json(operadoras);
});
