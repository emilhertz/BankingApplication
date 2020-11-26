const https = require("https");
const httpProxy = require("http-proxy");
const fs = require("fs");
const path = require("path");
const seaport = require("seaport");
const seaportConnection = seaport.connect("localhost", 9090);

const proxyServer = httpProxy.createProxyServer();

let i = -1;

const loadBalancer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "SSL", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "SSL", "cert.pem")),
  },
  (req, res) => {
    let servers = seaportConnection.query();
    if (!servers.length) {
      res.end("No servers available");
      //return?!
    }
    i = (i + 1) % servers.length;
    let port = servers[i].port;
    proxyServer.web(req, res, {
      target: `https://localhost:${port}`,
      secure: false,
    });
  }
);

loadBalancer.listen(5000, () =>
  console.log("Load balancer is listening on port 5000")
);
