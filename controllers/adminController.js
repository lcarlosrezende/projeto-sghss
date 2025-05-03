const { Admin } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Função para criar um novo administrador
exports.criarAdmin = async (req, res) => {
  const { senha, email } = req.body;

  try {
    // Verifica se o email foi informado
    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios." });
    }

    // Verifica se o email já existe no banco de dados
    const adminExistente = await Admin.findOne({ where: { email } });
    if (adminExistente) {
      return res
        .status(400)
        .json({ message: "Administrador já existe com esse e-mail." });
    }

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Cria o novo administrador
    const novoAdmin = await Admin.create({
      senha: senhaCriptografada,
      email,
    });

    res.status(201).json({
      message: "Administrador criado com sucesso",
      admin: { email: novoAdmin.email, admin_id: novoAdmin.admin_id },
    });
  } catch (err) {
    console.error("Erro ao criar o administrador:", err);
    res
      .status(500)
      .json({ message: "Erro ao criar o administrador.", error: err.message });
  }
};

// Função para listar todos os administradores
exports.listarAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: ["admin_id", "email"], // Retorna apenas ID e email para segurança
    });
    res.status(200).json(admins);
  } catch (err) {
    console.error("Erro ao listar administradores:", err);
    res
      .status(500)
      .json({ message: "Erro ao listar administradores.", error: err.message });
  }
};

// Função para buscar um administrador por ID
exports.obterAdminPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id, {
      attributes: ["admin_id", "email"], // Retorna apenas ID e email para segurança
    });

    if (!admin) {
      return res.status(404).json({ message: "Administrador não encontrado." });
    }

    res.status(200).json(admin);
  } catch (err) {
    console.error("Erro ao buscar administrador por ID:", err);
    res
      .status(500)
      .json({ message: "Erro ao buscar administrador.", error: err.message });
  }
};

// Função para atualizar um administrador por ID
exports.atualizarAdmin = async (req, res) => {
  const { id } = req.params;
  const { senha, email } = req.body;

  try {
    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ message: "Administrador não encontrado." });
    }

    const updates = {};
    if (email && email !== admin.email) {
      const adminExistente = await Admin.findOne({ where: { email } });
      if (adminExistente && adminExistente.admin_id !== parseInt(id)) {
        return res
          .status(400)
          .json({ message: "Email já está em uso por outro administrador." });
      }
      updates.email = email;
    }

    if (senha) {
      updates.senha = await bcrypt.hash(senha, 10);
    }

    if (Object.keys(updates).length > 0) {
      await Admin.update(updates, {
        where: { admin_id: id },
      });
      const adminAtualizado = await Admin.findByPk(id, {
        attributes: ["admin_id", "email"], // Retorna apenas ID e email para segurança
      });
      return res.status(200).json({
        message: "Administrador atualizado com sucesso.",
        admin: adminAtualizado,
      });
    }

    return res.status(200).json({ message: "Nenhum dado para atualizar." });
  } catch (err) {
    console.error("Erro ao atualizar administrador:", err);
    res.status(500).json({
      message: "Erro ao atualizar administrador.",
      error: err.message,
    });
  }
};

// Função para deletar um administrador por ID
exports.deletarAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ message: "Administrador não encontrado." });
    }

    await Admin.destroy({
      where: { admin_id: id },
    });

    res.status(200).json({ message: "Administrador deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar administrador:", err);
    res
      .status(500)
      .json({ message: "Erro ao deletar administrador.", error: err.message });
  }
};
