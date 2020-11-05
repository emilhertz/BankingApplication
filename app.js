const express = require('express');
const app = express();
const bodyParser = require('body-parser')

//import DB
const { db } = require('./database');
db.authenticate(); //tests the connection

//Added Json Body-parser
app.use(bodyParser.json());

//Import Routes
const accountRoute = require('./routes/accounts');
app.use('/accounts', accountRoute)

//Initial route
app.get('/', (req, res) => {
    res.send('Welcome to the banking app');
});

//Start listening
app.listen(8080, () => {
    console.log('Server listening on 8080');
});
