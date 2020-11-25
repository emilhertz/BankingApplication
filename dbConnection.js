const Sequelize = require("sequelize");

//DB-connection
exports.db = new Sequelize({
  dialect: "sqlite",
  storage: "./bank.db",
  define: {
    timestamps: false,
  },
});
