const { obtemPeticoes, obtemPeticao, adicionaPeticao, alteraPeticao, deletaPeticao, assinarPeticao } = require("../controllers/peticoes");

//O sistema deve possibilitar inclusão, alteração, deleção e consulta de petições
module.exports = {
	//O sistema deve possibilitar consulta de petições
	//Qualquer usuário pode ver as petições
	obtemPeticoes: (app) => {
		app.get("/api/peticoes", (req, res) => {
			obtemPeticoes(app, req, res);
		});
	},
	obtemPeticao: (app) => {
		app.get("/api/peticao/:id", (req, res) => {
			obtemPeticao(app, req, res);
		});
	},

	//O sistema deve possibilitar inclusão
	//Somente usuário autenticados podem criar petições
	adicionaPeticao: (app) => {
		app.post("/api/peticao", (req, res) => {
			adicionaPeticao(app, req, res);
		});
	},

	//O sistema deve possibilitar alteração
	//Somente quem pode alterar petições é o usuário que criou
	alteraPeticao: (app) => {
		app.put("/api/peticao/:id", (req, res) => {
			alteraPeticao(app, req, res);
		});
	},

	//O sistema deve possibilitar deleção
	//Somente quem pode excluir petições é o usuário que criou
	deletaPeticao: (app) => {
		app.delete("/api/peticao/:id", (req, res) => {
			deletaPeticao(app, req, res);
		});
	},

	//Somente usuário autenticados podem assinar petições
	assinarPeticao: (app) => {
		app.put("/api/peticao/:id/assinar", (req, res) => {
			assinarPeticao(app, req, res);
		});
	},
};
