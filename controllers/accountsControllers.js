const Account = require("../models/accountModel");

exports.allAccountsController = async (req, res) => {
    await Account.findAll()
    .then(accounts => res.end(JSON.stringify(accounts)))
    .catch(err => res.status(500).end(err.message))
};

 exports.postAccountController = (req, res) => {
    //creates account instance in DB
    Account.create({
        fName: req.body.fName,
        lName: req.body.lName,
        branch: req.body.branch,
        balance: req.body.balance
    })
    .then(res.end('User Created!:'))
    .catch(err => res.status(500).end(err.message));
};

exports.accountController = async (req, res) => {
    await Account.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(account => res.end(JSON.stringify(account)))
    .catch(err => res.status(500).end(err.message))
};