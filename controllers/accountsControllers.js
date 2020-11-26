const Account = require("../models/accountModel");

//GET /accounts
exports.allAccountsController = async (req, res) => {
  try {
    let allAccounts = await Account.findAll();
    res.json(allAccounts);
  } catch (e) {
    res.status(500).end(e.message);
  }
};

//POST /accounts
exports.createAccountController = async (req, res) => {
  let { alias, balance, client_id } = req.body;
  try {
    await Account.create({
      alias,
      balance,
      client_id,
    }).then((user) => res.json(user));
  } catch (e) {
    res.status(500).end(e.message);
  }
};

//GET /accounts/:id
exports.accountController = async (req, res) => {
  let { id } = req.params;
  try {
    let account = await Account.findAll({
      where: {
        id,
      },
    });
    //REPLACE WITH !ACCOUNT.LENGTH??
    if (account.length === 0)
      throw new Error(`No account with id: ${id} found`);
    res.json(account);
  } catch (e) {
    res.status(500).end(e.message);
  }
};

//PUT /accounts/:id
exports.updateAccountController = async (req, res) => {
  let { balance, alias } = req.body;
  let { id } = req.params;
  try {
    await Account.update(
      { balance, alias },
      {
        where: {
          id,
        },
      }
    ).then(() => {
      //logic to pass test - returns updated instance
      Account.findAll({ where: { id } }).then((account) => res.json(account));
    });
  } catch (e) {
    res.status(500).end(e.message);
  }
};

//DELETE /accounts/:id
exports.deleteAccountController = async (req, res) => {
  let { id } = req.params;
  try {
    await Account.destroy({
      where: {
        id,
      },
    });
    res.json("Account deleted");
  } catch (e) {
    res.status(500).end(e.message);
  }
};

//GET /accounts/:id/balance
exports.getAccountBalanceController = async (req, res) => {
  let { id } = req.params;
  try {
    let balance = await Account.findAll({
      attributes: ["balance"],
      where: {
        id,
      },
    });
    if (balance.length === 0)
      throw new Error(`No account with id: ${id} found`);
    res.json(balance);
  } catch (e) {
    res.status(500).end(e.message);
  }
};

//PUT /accounts/transfer
exports.transferController = async (req, res) => {
  let { fromAccount, toAccount, amount } = req.body;
  try {
    //first these two req make sure that the accounts exist
    let origin = await Account.findAll({
      where: {
        id: fromAccount,
      },
    });
    let destination = await Account.findAll({
      where: {
        id: toAccount,
      },
    });

    //error checks
    if (fromAccount === toAccount)
      throw new Error("Cannot transfer money to and from same account");

    if (origin.length === 0 || destination.length === 0)
      throw new Error("Account(s) not found");

    if (origin[0].dataValues.balance < amount)
      throw new Error("Not sufficient funds");

    //if no errors, new balances are calculated
    let newFromAccountBalance = origin[0].dataValues.balance - amount;
    let newToAccountBalance = destination[0].dataValues.balance + amount;

    //then actual account balances are updated
    await Account.update(
      {
        balance: newFromAccountBalance,
      },
      {
        where: {
          id: fromAccount,
        },
      }
    );
    await Account.update(
      {
        balance: newToAccountBalance,
      },
      {
        where: {
          id: toAccount,
        },
      }
    );
    res.end("money transfered!");
  } catch (e) {
    console.log(e.message);
    res.end(e.message);
  }
};
