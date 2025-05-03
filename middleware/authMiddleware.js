const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  // Remover o "Bearer " do início do token
  const bearerToken = token.split(" ")[1];
  if (!bearerToken)
    return res.status(401).json({ message: "Token malformado" });

  // Verificar o token
  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Erro ao verificar token:", err);
      return res.status(401).json({ message: "Token inválido" });
    }

    req.admin_id = decoded.id;
    next();
  });
};
