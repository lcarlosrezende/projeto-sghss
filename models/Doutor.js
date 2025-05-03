module.exports = (sequelize, DataTypes) => {
  const Doutor = sequelize.define(
    "Doutor",
    {
      doutor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      especializacao: DataTypes.STRING,
      contato: DataTypes.STRING,
      email: DataTypes.STRING,
      agendamento: DataTypes.STRING,
    },
    {
      tableName: "Doutor",
      timestamps: false,
      underscored: false,
    }
  );

  //   Doutor.associate = (models) => {
  //     Doutor.belongsToMany(models.Paciente, {
  //       through: "Paciente_Doutor",
  //       foreignKey: "doutor_id",
  //       otherKey: "paciente_id",
  //       as: "pacientes",
  //     });

  //     Doutor.belongsToMany(models.Admin, {
  //       through: "Admin_Doutor",
  //       foreignKey: "doutor_id",
  //       otherKey: "admin_id",
  //       as: "admins",
  //     });
  //   };

  return Doutor;
};
