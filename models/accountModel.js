const { Model, DataTypes } = require('sequelize');
const { db } = require('../database');

class Account extends Model {};

//model that mimicks the DB-table
Account.init({
    //table collumns and properties
    fName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize: db, //connection instance
    modelName: 'Account'
});

module.exports = Account;