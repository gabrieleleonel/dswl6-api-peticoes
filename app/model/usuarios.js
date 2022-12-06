const client = require("../../config/dbConnection");
const { ObjectId } = require("bson");

module.exports = class UsuariosModel {
	static async getUsuarios() {
		console.log(`[getallusuarios]`);
		const cursor = await client.db("dsw").collection("usuarios").find();
		return await cursor.toArray();
	}
	static async getUsuario(id) {
		console.log(`[getusuariobyid]_id:${id}`);
		const cursor = await client
			.db("dsw")
			.collection("usuarios")
			.find({ _id: ObjectId(`${id}`) });
		return await cursor.toArray();
	}

	static async getUsuarioByUsuarioSenha(user, senha) {
		console.log(`[getusuariobyusuariosenha]usuario:${user}`);
		try {
			const cursor = await client.db("dsw").collection("usuarios").find({ usuario: user, senha: senha });
			return await cursor.toArray();
		} catch (error) {
			console.log(`[getusuariobyusuariosenha] ${error}`);
			return null;
		}
	}

	static async getUsuarioByUsuario(user) {
		console.log(`[getusuariobyusuario]usuario:${user}`);
		try {
			const cursor = await client.db("dsw").collection("usuarios").find({ usuario: user });
			return await cursor.toArray();
		} catch (error) {
			console.log(`[getusuariobyusuariosenha] ${error}`);
			return null;
		}
	}

	static async adicionaUsuario(peticaoData) {
		console.log(`[Usuario Model - Add Usuario] ${peticaoData}`);
		try {
			const newUsuario = {
				nome: peticaoData.nome,
				usuario: peticaoData.usuario,
				senha: peticaoData.senha,
				peticaoData_de_criacao: new Date(),
			};
			const addedUsuario = await client.db("dsw").collection("usuarios").insertOne(newUsuario);
			console.log(`New usuario inserted with the following id ${addedUsuario.insertedId}`);
			return addedUsuario;
		} catch (error) {
			console.log(`[usuarioService] Error: ${error}`);
			return error;
		}
	}
	static async alteraUsuarios(id, peticaoData) {
		console.log(`[Usuario Model - Alter Usuario] ${peticaoData}`);
		try {
			const usuario = {
				nome: peticaoData.nome,
				usuario: peticaoData.usuario,
				senha: peticaoData.senha,
				dataAlteracao: new Date(),
			};
			const updateUsuario = await client
				.db("dsw")
				.collection("usuarios")
				.updateOne({ _id: ObjectId(`${id}`) }, [{ $set: usuario }]);
			console.log(`The usuario updated with the following id ${id}`);
			return updateUsuario;
		} catch (error) {
			console.log(`[usuarioService] Error: ${error}`);
			return error;
		}
	}
};
