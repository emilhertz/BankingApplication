const { Model, DataTypes } = require("sequelize");
const { db } = require("../dbConnection");

class Account extends Model {}

//remember client_ID!!!
Account.init(
  {
    balance: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Account",
  }
);

module.exports = Account;
