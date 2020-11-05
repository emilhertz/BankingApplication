const Sequelize = require('sequelize');

//DB-connection
exports.db = new Sequelize(process.env.DB, process.env.DBname, process.env.DBpword, {
    host: 'localhost',
    dialect: 'postgres',
    //connection pool
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}); 