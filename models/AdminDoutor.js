module.exports = (sequelize, DataTypes) => {
  const AdminDoutor = sequelize.define(
    "AdminDoutor",
    {
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Admin",
          key: "admin_id",
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
    },
    {
      tableName: "Admin_Doutor",
      timestamps: false, // Se você não quer as colunas createdAt e updatedAt
      underscored: false, // Se os nomes das suas colunas não usam snake_case
    }
  );

  return AdminDoutor;
};
