const app = require("./config/server.js");
const routes = require("./app/routes/routes");

//O sistema deve possibilitar inclusão, alteração, deleção e consulta de petições
routes.obtemPeticoes(app);
routes.obtemPeticao(app);
routes.adicionaPeticao(app);
routes.alteraPeticao(app);
routes.deletaPeticao(app);
routes.assinarPeticao(app);
