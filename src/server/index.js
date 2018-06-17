const express   = require('express');
const path      = require('path');
const chalk     = require('chalk');
const bodyParser = require('body-parser');
const cors = require('cors');

const app       = express();
const DOCS_PATH = '../../docs/';
const PORT      = 8082;
const IP_ADRESS = 'localhost';

app.use(cors());
app.use(express.static(path.join(__dirname, DOCS_PATH)));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.get(
  '/dboff',
  (req, res) => res.sendFile(path.join(__dirname, DOCS_PATH, 'dboff.json'))

);

app.get(
  '/dblistaOff',
  (req, res) => res.sendFile(path.join(__dirname, DOCS_PATH, 'dblistaOff.json'))
);


app.put('/dboff',function(req,res){
  var username = req.body;
  res.send(username);

});


/* eslint-disable no-console */
app.listen(
  PORT,
  IP_ADRESS,
  () => console.log(`
    =====================================================
    -> Server (${chalk.bgBlue('SPA')}) 🏃 (running) on ${chalk.green(IP_ADRESS)}:${chalk.green(PORT)}
    =====================================================
  `)
);
/* eslint-enable no-console */
