const { Pessoa } = require("../models");

exports.criar = async (req, res) => {
  try {
    const { nome, contato, email } = req.body;
    const novaPessoa = await Pessoa.create({ nome, contato, email });

    res.status(201).json({
      mensagem: "Pessoa criada com sucesso.",
      pessoa: novaPessoa,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ mensagem: "Erro ao criar pessoa.", erro: err.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.status(200).json(pessoas);
  } catch (err) {
    res
      .status(500)
      .json({ mensagem: "Erro ao listar pessoas.", erro: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pessoa = await Pessoa.findByPk(id);

    if (!pessoa) {
      return res.status(404).json({ mensagem: "Pessoa não encontrada." });
    }

    res.status(200).json(pessoa);
  } catch (err) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar pessoa.", erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, contato, email } = req.body;

    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) {
      return res.status(404).json({ mensagem: "Pessoa não encontrada." });
    }

    await pessoa.update({ nome, contato, email });
    res
      .status(200)
      .json({ mensagem: "Pessoa atualizada com sucesso.", pessoa });
  } catch (err) {
    res
      .status(500)
      .json({ mensagem: "Erro ao atualizar pessoa.", erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) {
      return res.status(404).json({ mensagem: "Pessoa não encontrada." });
    }

    await pessoa.destroy();
    res.status(200).json({ mensagem: "Pessoa deletada com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ mensagem: "Erro ao deletar pessoa.", erro: err.message });
  }
};
