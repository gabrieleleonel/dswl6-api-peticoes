const client = require("../../config/dbConnection");
const { ObjectId } = require("bson");

module.exports = class PeticoesModel {
	static async obtemPeticoes() {
		console.log(`getallpeticoes`);
		const cursor = await client.db("dsw").collection("peticoes").find();
		const peticoes = await cursor.toArray();
		return peticoes;
	}
	static async obtemPeticao(id) {
		console.log(`getpeticaobyid_id:${id}`);
		const cursor = await client
			.db("dsw")
			.collection("peticoes")
			.find({ _id: ObjectId(`${id}`) });
		const peticao = await cursor.toArray();
		return peticao;
	}
	static async adicionaPeticao(peticaoData) {
		try {
			const novaPeticao = {
				titulo: peticaoData.titulo,
				descricao: peticaoData.descricao,
				usuarioCriacao: peticaoData.usuario,
				dataCriacao: new Date(),
			};
			const peticaoAdicionada = await client.db("dsw").collection("peticoes").insertOne(novaPeticao);
			console.log(`Peticao adicionada: ${peticaoAdicionada.insertedId}`);
			return peticaoAdicionada;
		} catch (error) {
			console.log(`Peticao Error: ${error}`);
			return error;
		}
	}
	static async alteraPeticao(id, peticaoData) {
		try {
			const peticao = {
				titulo: peticaoData.titulo,
				descricao: peticaoData.descricao,
				usuarioAlteracao: peticaoData.usuario,
				dataAlteracao: new Date(),
			};
			const atualizaPeticao = await client
				.db("dsw")
				.collection("peticoes")
				.updateOne({ _id: ObjectId(`${id}`) }, { $set: peticao });
			console.log(`Preticao atualizada: ${id}`);
			return atualizaPeticao;
		} catch (error) {
			console.log(`Peticao Error: ${error}`);
			return error;
		}
	}
	static async deletaPeticao(id) {
		try {
			await client
				.db("dsw")
				.collection("peticoes")
				.deleteOne({ _id: ObjectId(id) });
		} catch (error) {
			console.log(`Peticao Error: ${error}`);
			return error;
		}
	}

	static async assinarPeticao(id, peticaoData, assinaturasPeticao) {
		assinaturasPeticao.push(peticaoData.usuario);
		try {
			//Somente usuário autenticados podem assinar petições
			const peticao = {
				assinaturas: assinaturasPeticao,
			};
			const atualizaPeticao = await client
				.db("dsw")
				.collection("peticoes")
				.updateOne({ _id: ObjectId(`${id}`) }, { $set: peticao });
			console.log(`Peticao Atualizada: ${id}`);
			return atualizaPeticao;
		} catch (error) {
			console.log(`Peticao Error: ${error}`);
			return error;
		}
	}

	isValid(peticao) {
		if (!peticao || (Array.isArray(peticao) && !peticao.length)) {
			console.log("Não existe petição cadastrada.");
			return false;
		}
		return true;
	}

	criadorDaPeticao(peticao, usuario) {
		return peticao[0].usuarioCriacao == usuario;
	}
};
