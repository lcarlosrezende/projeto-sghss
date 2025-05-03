const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AdminModel = require("./Admin")(sequelize, DataTypes);
const PessoaModel = require("./Pessoa")(sequelize, DataTypes);
const PacienteModel = require("./Paciente")(sequelize, DataTypes);
const AdminPacienteModel = require("./AdminPaciente")(sequelize, DataTypes);
const DoutorModel = require("./Doutor")(sequelize, DataTypes);
const AdminDoutorModel = require("./AdminDoutor")(sequelize, DataTypes);
const PacienteDoutorModel = require("./PacienteDoutor")(sequelize, DataTypes);

PacienteModel.belongsTo(PessoaModel, {
  foreignKey: "pessoa_id",
  as: "pessoa",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

PessoaModel.hasOne(PacienteModel, {
  foreignKey: "pessoa_id",
  as: "paciente",
});

AdminModel.belongsToMany(PacienteModel, {
  through: AdminPacienteModel,
  foreignKey: "admin_id",
  otherKey: "paciente_id",
  as: "pacientes",
});

PacienteModel.belongsToMany(AdminModel, {
  through: AdminPacienteModel,
  foreignKey: "paciente_id",
  otherKey: "admin_id",
  as: "admins",
});

// Correção para a associação Paciente <-> Doutor
DoutorModel.belongsToMany(PacienteModel, {
  through: PacienteDoutorModel, // Use a model da tabela de junção
  foreignKey: "doutor_id",
  otherKey: "paciente_id",
  as: "pacientes",
});

PacienteModel.belongsToMany(DoutorModel, {
  through: PacienteDoutorModel, // Use a model da tabela de junção
  foreignKey: "paciente_id",
  otherKey: "doutor_id",
  as: "doutores",
});

// Associações para Admin <-> Doutor
AdminModel.belongsToMany(DoutorModel, {
  through: AdminDoutorModel,
  foreignKey: "admin_id",
  otherKey: "doutor_id",
  as: "doutores",
});

DoutorModel.belongsToMany(AdminModel, {
  through: AdminDoutorModel,
  foreignKey: "doutor_id",
  otherKey: "admin_id",
  as: "admins",
});

module.exports = {
  sequelize,
  Admin: AdminModel,
  Pessoa: PessoaModel,
  Paciente: PacienteModel,
  AdminPaciente: AdminPacienteModel,
  Doutor: DoutorModel,
  AdminDoutor: AdminDoutorModel,
  PacienteDoutor: PacienteDoutorModel,
};
