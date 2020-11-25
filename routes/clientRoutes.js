const express = require("express");
const router = express.Router();

const {
  allClientsController,
  createClientController,
  clientController,
  updateClientController,
  deleteClientController,
} = require("../controllers/clientController");

//Route for all clients
router.get("/", allClientsController);

//Route for creating new client
router.post("/", createClientController);

//Route for returning specific client
router.get("/:id", clientController);

//Route for updating specific client
router.put("/:id", updateClientController);

//Route for deleting specific client
router.delete("/:id", deleteClientController);

module.exports = router;
