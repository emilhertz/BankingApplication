const Client = require("../models/clientModel");

//GET /clients
exports.allClientsController = async (req, res) => {
  try {
    let clients = await Client.findAll();
    res.end(JSON.stringify(clients));
  } catch (e) {
    res.status(500).end(e.message);
  }
};

//POST /clients
exports.createClientController = async (req, res) => {
  let { firstname, lastname, streetAddress, city } = req.body;
  try {
    await Client.create({
      firstname,
      lastname,
      streetAddress,
      city,
    });
    res.end("Client Created!");
  } catch (e) {
    res.status(500).end(e.message);
  }
};

//GET /clients/:id
exports.clientController = async (req, res) => {
  let { id } = req.params;
  try {
    let client = await Client.findAll({
      where: {
        id,
      },
    });
    if (client.length === 0) throw new Error(`No client with id: ${id} found`);
    res.end(JSON.stringify(client));
  } catch (e) {
    res.status(500).end(e.message);
  }
};

//PUT /clients/:id
exports.updateClientController = async (req, res) => {
  let { firstname, lastname, streetAddress, city } = req.body;
  let { id } = req.params;
  try {
    await Client.update(
      { firstname, lastname, streetAddress, city },
      {
        where: {
          id,
        },
      }
    );
    res.end("Client Updated!");
  } catch (e) {
    res.status(500).end(e.message);
  }
};

//DELETE /clients/:id
exports.deleteClientController = async (req, res) => {
  let { id } = req.params;
  try {
    await Client.destroy({
      where: {
        id,
      },
    });
    res.end("Client Deleted!");
  } catch (e) {
    res.status(500).end(e.message);
  }
};
