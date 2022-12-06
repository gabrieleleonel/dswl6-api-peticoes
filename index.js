const app = require("./config/server");
const routes = require("./app/routes/routes");

//O sistema deve possibilitar inclusão, alteração, deleção e consulta de petições
routes.obtemPeticoes(app);
routes.obtemPeticao(app);
routes.adicionaPeticao(app);
routes.alteraPeticao(app);
routes.deletaPeticao(app);
routes.assinarPeticao(app);
routes.login(app);
routes.logout(app);
routes.adicionaUsuario(app);
routes.alteraUsuarios(app);

module.exports = app;
