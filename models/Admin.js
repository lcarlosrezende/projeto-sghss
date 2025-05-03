module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Admin",
      timestamps: false,
      underscored: false,
    }
  );

  Admin.associate = (models) => {
    Admin.belongsToMany(models.Doutor, {
      through: "Admin_Doutor",
      foreignKey: "admin_id",
      otherKey: "doutor_id",
      as: "doutores",
    });

    Admin.belongsToMany(models.Paciente, {
      through: "Admin_Paciente",
      foreignKey: "admin_id",
      otherKey: "paciente_id",
      as: "pacientes",
    });
  };

  return Admin;
};
