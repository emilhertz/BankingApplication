const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const accountRoute = require("./routes/accountsRoutes");
const clientRoute = require("./routes/clientRoutes");
const https = require("https");
const fs = require("fs");
const path = require("path");
const seaport = require("seaport");

//seaport connection
const seaportConnection = seaport.connect("localhost", 9090);

//ssl-server
const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "SSL", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "SSL", "cert.pem")),
  },
  app
);

//Added Body-parser middleware
app.use(bodyParser.json());

//Routes
app.use("/accounts", accountRoute);
app.use("/clients", clientRoute);

server.listen(seaportConnection.register("server"), () => {
  console.log(`Server is listening on port: ${server.address().port}`);
});

//needs load-balancer implementation
//needs one-click-run solution for easy excecution
//needs to pass test
