const express = require("express");
const router = express.Router();

const {
  allAccountsController,
  createAccountController,
  accountController,
  updateAccountController,
  deleteAccountController,
  getAccountBalanceController,
  transferController,
} = require("../controllers/accountsControllers");

//Route for all accounts
router.get("/", allAccountsController);

//Route for adding account
router.post("/", createAccountController);

//Route for transfering funds between accounts
router.put("/transfer", transferController);

//Route for getting specific account from ID
router.get("/:id", accountController);

//Route for updating specific account
router.put("/:id", updateAccountController);

//Route for deleting account
router.delete("/:id", deleteAccountController);

//Route for getting balance from specific account
router.get("/:id/balance", getAccountBalanceController);

module.exports = router;
