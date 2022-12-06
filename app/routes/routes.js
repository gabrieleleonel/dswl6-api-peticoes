const Peticoes = require("../controllers/peticoes");
const Usuarios = require("../controllers/usuarios");

/***
 * @description O sistema deve possibilitar inclusão, alteração, deleção e consulta de petições.
 */

module.exports = {
	obtemPeticoes: (app) => {
		app.get("/api/peticoes", Peticoes.obtemPeticoes);
	},

	obtemPeticao: (app) => {
		app.get("/api/peticao/:id", Peticoes.obtemPeticao);
	},

	adicionaPeticao: (app) => {
		app.post("/api/peticao", Usuarios.verifyJWT, Peticoes.adicionaPeticao);
	},

	alteraPeticao: (app) => {
		app.put("/api/peticao/:id", Usuarios.verifyJWT, Peticoes.alteraPeticao);
	},

	deletaPeticao: (app) => {
		app.delete("/api/peticao/:id", Usuarios.verifyJWT, Peticoes.deletaPeticao);
	},

	assinarPeticao: (app) => {
		app.put("/api/peticao/:id/assinar", Usuarios.verifyJWT, Peticoes.assinarPeticao);
	},

	login: (app) => {
		app.post("/api/login", Usuarios.getUsuarioByUsuarioSenha);
	},

	logout: (app) => {
		app.post("/api/logout", Usuarios.logout);
	},

	adicionaUsuario: (app) => {
		app.post("/api/usuario", Usuarios.adicionaUsuario);
	},

	alteraUsuarios: (app) => {
		app.put("/api/usuario/:id", Usuarios.verifyJWT, Usuarios.alteraUsuarios);
	},
};
