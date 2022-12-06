const PeticoesModel = require("../model/peticoes");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

/**
 * @description As petições devem ter no mínimo titulo, descricao, usuario que a criou, data de criação
 * @param {Object} titulo: peticaoData.titulo
 * @param {Object} descricao: peticaoData.descricao
 * @param {Object} usuario_criacao: peticaoData.usuario
 * @param {Object} data_de_criacao: new Date()
 */

const JoiValidations = Joi.object().keys({
	titulo: Joi.string().required().min(1).max(50),
	descricao: Joi.string().required().min(1).max(500),
	usuario: Joi.objectId(),
});

module.exports = class PeticoesController {
	/**
	 * @description obtem todas as petições
	 * @public
	 */
	static async obtemPeticoes(req, res, next) {
		try {
			const peticoes = await PeticoesModel.obtemPeticoes();
			if (!peticoes) {
				return res.status(404).json(`Não existe nenhuma petição cadastrada.`);
			}
			return res.status(200).json(peticoes);
		} catch (error) {
			console.log(`[Peticoes Controller obtemPeticoes Error] ${error}`);
			res.status(500).json({ error: error });
		}
	}

	/**
	 * @description obtem peticao filtrada por id
	 * @public
	 */
	static async obtemPeticao(req, res, next) {
		try {
			const id = req.params.id;
			const peticao = await PeticoesModel.obtemPeticao(id);
			if (!peticao) {
				return res.status(404).json(`Não existe nenhuma petição cadastrada.`);
			}
			return res.status(200).json(peticao);
		} catch (error) {
			console.log(`[Peticoes Controller obtemPeticao Error] ${error}`);
			return res.status(500).json({ error: error });
		}
	}

	/**
	 * @description adiciona peticao
	 */
	static async adicionaPeticao(req, res, next) {
		const { error, value } = JoiValidations.validate(req.body);
		if (error) {
			const result = {
				msg: "Petição não adicionada. Campos não preenchidos corretamente.",
				error: error.details,
			};
			return res.status(404).json(result);
		}
		try {
			const adicionado = await PeticoesModel.adicionaPeticao(req.body);
			return res.status(200).json({ msg: "adicionado", retorno: adicionado });
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	}

	/**
	 * @description altera peticao
	 */
	static async alteraPeticao(req, res, next) {
		const { error, value } = JoiValidations.validate(req.body);
		if (error) {
			const result = {
				msg: "Petição não alterada. Campos não preenchidos corretamente.",
				error: error.details,
			};
			return res.status(404).json(result);
		}

		try {
			const peticao = await PeticoesModel.getPeticao(req.params.id);
			var isValid = PeticoesModel.isValid(peticao);
			if (!isValid) return res.status(404).json(`Não existe petição cadastrada.`);

			if (!PeticoesModel.criadorDaPeticao(peticao, req.body.usuario)) return res.status(404).json({ msg: `Alteração não autorizada. Apenas usuário criador pode alterar.` });

			const alterado = await PeticoesModel.alteraPeticao(req.params.id, req.body);
			return res.status(200).json({ msg: "Alterado", retorno: alterado });
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	}

	/**
	 * @description deleta peticao
	 */
	static async deletaPeticao(req, res, next) {
		try {
			const peticao = await PeticoesModel.getPeticao(req.params.id);
			var isValid = PeticoesModel.isValid(peticao);
			if (!isValid) return res.status(404).json(`Não existe petição cadastrada.`);

			if (!PeticoesModel.criadorDaPeticao(peticao, req.body.usuario)) return res.status(404).json({ msg: `Deleção não autorizada. Apenas usuário criador pode deletar.` });

			const deletada = await PeticoesModel.deletaPeticao(req.params.id);
			return res.status(200).json({ msg: "Deletada", retorno: deletada });
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	}

	/**
	 * @description assinar peticao
	 */
	static async assinarPeticao(req, res, next) {
		try {
			const peticao = await PeticoesModel.getPeticao(req.params.id);
			var isValid = PeticoesModel.isValid(peticao);
			if (!isValid) return res.status(404).json(`Não existe petição cadastrada.`);

			console.log("[assinarPeticao]: peticao", peticao[0]);
			var assinaturas = [];
			if (peticao[0].assinaturas) {
				if (peticao[0].assinaturas.includes(req.body.usuario)) {
					console.log("[assinarPeticao]: usuário já assinou petição");
					return res.status(404).json(`Petição já assinada por este usuário.`);
				}
				assinaturas = peticao[0].assinaturas;
			}
			const assinada = await PeticoesModel.assinarPeticao(req.params.id, req.body, assinaturas);
			return res.status(200).json({ msg: "Assinada", retorno: assinada });
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	}
};
