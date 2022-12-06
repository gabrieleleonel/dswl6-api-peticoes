const usuarios = require("../model/usuarios");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const secret_key_jwt = "shhhhh";

const JoiValidations = Joi.object().keys({
	nome: Joi.string().required().min(1).max(200),
	usuario: Joi.string().required().min(1).max(20),
	senha: Joi.string().required().min(1).max(20),
});

module.exports = class UsuariosController {
	static async verifyJWT(req, res, next) {
		var authorization = req.headers["authorization"];
		if (!authorization) return res.status(401).json({ auth: false, message: "No token provided." });

		const token = authorization.replace("Bearer ", "");
		if (!token) return res.status(401).json({ auth: false, message: "No token provided." });

		jwt.verify(token, secret_key_jwt, function (err, decoded) {
			if (err) return res.status(500).json({ auth: false, message: "Failed to authenticate token." });
			// se tudo estiver ok, salva no request para uso posterior
			console.log("decoded:", decoded);
			req.body.usuario = decoded.id;
			next();
		});
	}

	static async getUsuarioByUsuarioSenha(req, res, next) {
		try {
			const usuarioLogado = await usuarios.getUsuarioByUsuarioSenha(req.body.usuario, req.body.senha);
			console.log("usuarioLogado:", usuarioLogado);
			if (!usuarioLogado || (Array.isArray(usuarioLogado) && !usuarioLogado.length)) {
				return res.status(500).json({ message: "Login inválido!" });
			}
			var token = jwt.sign({ id: usuarioLogado[0]._id }, secret_key_jwt, { expiresIn: "1h" });
			return res.json({ auth: true, token: token });
		} catch (error) {
			console.log(`[Usuarios Controller Error] ${error}`);
			return res.status(500).json({ error: error });
		}
	}

	static async adicionaUsuario(req, res, next) {
		const { error, value } = JoiValidations.validate(req.body);
		if (error) {
			const result = {
				msg: "Usuário não incluído. Campos não foram preenchidos corretamente.",
				error: error.details,
			};
			return res.status(404).json(result);
		}

		var usuarioExistente = await usuarios.getUsuarioByUsuario(req.body.usuario);
		console.log("usuarioExistente:", usuarioExistente);

		if (!usuarioExistente || (Array.isArray(usuarioExistente) && usuarioExistente.length > 0)) return res.status(500).json({ message: "Já existe uma conta para o usuário." });

		try {
			const addedUsuario = await usuarios.adicionaUsuario(req.body);
			return res.status(200).json(addedUsuario);
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	}

	static async alteraUsuarios(req, res, next) {
		const { error, value } = JoiValidations.validate(req.body);
		if (error) {
			const result = {
				msg: "Usuário não alterado. Campos não foram preenchidos corretamente.",
				error: error.details,
			};
			return res.status(404).json(result);
		}
		try {
			const alter = await usuarios.alteraUsuarios(req.params.id, req.body);
			console.log("alter:", alter);
			return res.status(200).json("Alterado: ", req.params.id);
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	}

	static async logout(req, res, next) {
		return res.json({ auth: false, token: null });
	}
};
