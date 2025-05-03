const express = require("express");
const morgan = require("morgan");
const app = express();
const sequelize = require("./config/database");
require("dotenv").config();

app.use(express.json());

// Usando morgan para logging (formato 'dev' para desenvolvimento)
app.use(morgan("dev"));

const authRotas = require("./routes/authRotas");
const adminRotas = require("./routes/adminRotas");
const pacienteRotas = require("./routes/pacienteRotas");
const pessoaRotas = require("./routes/pessoaRotas");
const doutorRotas = require("./routes/doutorRotas");

app.use("/auth", authRotas);
app.use("/auth", adminRotas);
app.use("/auth", pacienteRotas);
app.use("/auth", pessoaRotas);
app.use("/auth", doutorRotas);

sequelize
  .authenticate()
  .then(() => console.log("Conectado ao MySQL com sucesso!"))
  .catch((err) => console.error("Erro na conexão com o BD:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
