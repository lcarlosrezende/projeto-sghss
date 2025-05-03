module.exports = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define(
    "Pessoa",
    {
      pessoa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contato: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      tableName: "Pessoa",
      timestamps: false,
      underscored: true,
    }
  );
  return Pessoa;
};
