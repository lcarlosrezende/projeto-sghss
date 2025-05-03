const { Admin } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se o administrador com o email existe no banco de dados
    const admin = await Admin.findOne({ where: { email } });

    // Se o administrador não for encontrado, retorna erro 404
    if (!admin) {
      return res.status(404).json({ message: "Admin não encontrado" });
    }

    // Compara a senha informada com a senha criptografada no banco de dados
    const senhaValida = await bcrypt.compare(senha, admin.senha);

    // Se a senha for inválida, retorna erro 401
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: admin.admin_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Atualiza o token no administrador
    admin.token = token;
    await admin.save();

    // Retorna a resposta com o token
    res.json(admin);
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: "Falha no login." });
  }
};
