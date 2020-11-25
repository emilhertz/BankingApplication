const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const accountRoute = require("./routes/accountsRoutes");
const clientRoute = require("./routes/clientRoutes");
const https = require("https");
const fs = require("fs");
const path = require("path");

//ssl work
const server = https
  .createServer(
    {
      key: fs.readFileSync(path.join(__dirname, "SSL", "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "SSL", "cert.pem")),
    },
    app
  )
  .listen(3443, () => {
    console.log("Server listening on port 3443");
  });

//Added Body-parser middleware
app.use(bodyParser.json());

//Routes
app.use("/accounts", accountRoute);
app.use("/clients", clientRoute);

//needs load-balancer implementation
//needs one-click-run solution for easy excecution
//needs to pass test
