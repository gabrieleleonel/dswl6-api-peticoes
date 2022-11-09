//Qualquer usuário pode ver as petições
(module.exports.obtemPeticoes = (app, req, res) => {
	res.status(200).json({ mensagem: "obtemPeticoes - controllers" });
}),
	(module.exports.obtemPeticao = (app, req, res) => {
		res.status(200).json({ mensagem: "obtemPeticao - controllers" });
	}),
	//O sistema deve possibilitar inclusão
	//Somente usuário autenticados podem criar petições
	(module.exports.adicionaPeticao = (app, req, res) => {
		res.status(200).json({ mensagem: "adicionaPeticao - controllers" });
	}),
	//O sistema deve possibilitar alteração
	//Somente quem pode alterar petições é o usuário que criou
	(module.exports.alteraPeticao = (app, req, res) => {
		res.status(200).json({ mensagem: "alteraPeticao - controllers" });
	}),
	//O sistema deve possibilitar deleção
	//Somente quem pode excluir petições é o usuário que criou
	(module.exports.deletaPeticao = (app, req, res) => {
		res.status(200).json({ mensagem: "deletaPeticao - controllers" });
	}),
	//Somente usuário autenticados podem assinar petições
	(module.exports.assinarPeticao = (app, req, res) => {
		res.status(200).json({ mensagem: "assinarPeticao - controllers" });
	});
