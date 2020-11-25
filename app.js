const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const accountRoute = require("./routes/accountsRoutes");
const clientRoute = require("./routes/clientRoutes");

//Added Body-parser middleware
app.use(bodyParser.json());

//Routes
app.use("/accounts", accountRoute);
app.use("/clients", clientRoute);

//Replace with loadbalancer
app.listen(8080, () => {
  console.log("Server listening on 8080");
});

//needs SSL implementation
//needs load-balancer implementation
//needs one-click-run solution for easy excecution
//needs to pass test
