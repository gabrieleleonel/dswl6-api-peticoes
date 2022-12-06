const express = require("express");
const expressSession = require("express-session");
const body_parser = require("body-parser");
const app = express();

const port = process.env.PORT || 3000;

app.use(
	expressSession({
		secret: "Teste",
		resave: false,
		saveUninitialized: false,
	})
);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
app.use(express.json());
app.use(body_parser.urlencoded({ extended: true }));

module.exports = app;
