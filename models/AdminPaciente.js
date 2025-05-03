module.exports = (sequelize, DataTypes) => {
  const AdminPaciente = sequelize.define(
    "AdminPaciente",
    {
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Admin",
          key: "admin_id",
        },
      },
      paciente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Paciente",
          key: "paciente_id",
        },
      },
    },
    {
      tableName: "Admin_Paciente",
      timestamps: false,
      underscored: false,
    }
  );

  return AdminPaciente;
};
