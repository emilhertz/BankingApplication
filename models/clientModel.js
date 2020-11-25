const { Model, DataTypes } = require("sequelize");
const { db } = require("../dbConnection");

class Client extends Model {}

Client.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Client",
  }
);

module.exports = Client;
