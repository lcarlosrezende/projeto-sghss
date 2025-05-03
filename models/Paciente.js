module.exports = (sequelize, DataTypes) => {
  const Paciente = sequelize.define(
    "Paciente",
    {
      paciente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pessoa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      data_admissao: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      diagnostico: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "Paciente",
      timestamps: false,
      underscored: false,
    }
  );

  return Paciente;
};
