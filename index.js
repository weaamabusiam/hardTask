// npm i express mysql2 ejs body-parser
const express = require('express');
const port = 7575;
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");

const path = require('path');
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));

var db_M = require('./database');
global.db_pool = db_M.pool;

const fe_rtr = require('./routes/FE_R');
app.use('/', fe_rtr);


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});
