module.exports = (sequelize, DataTypes) => {
  const PacienteDoutor = sequelize.define(
    "PacienteDoutor", // Nome da Model (em PascalCase)
    {
      paciente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Paciente",
          key: "paciente_id",
        },
      },
      doutor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Doutor",
          key: "doutor_id",
        },
      },
      // Se a sua tabela de junção tiver outros campos (createdAt, updatedAt),
      // você pode definí-los aqui ou desabilitar timestamps na configuração.
    },
    {
      tableName: "paciente_doutor", // Nome exato da tabela no banco (em snake_case)
      timestamps: false, // Desabilita timestamps se a tabela não os possui
      underscored: true, // Se os nomes das suas colunas no banco são em snake_case
    }
  );

  return PacienteDoutor;
};
