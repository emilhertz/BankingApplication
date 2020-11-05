const express = require('express');
const router = express.Router();

const { allAccountsController, postAccountController, accountController } = require('../controllers/accountsControllers');

//Endpoint for all accounts
router.get('/', allAccountsController);

//Endpoint for adding user
router.post('/', postAccountController);

// Implement a new endpoint, that will be able to return a specific account by id. 
router.get('/:id', accountController);

module.exports = router;