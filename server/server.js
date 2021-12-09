const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
//this is a router for the /profile path
const profile = require('./profile');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Sets up ejs template engine to look in the views directory for templates
app.set('views', './views');
app.set('view engine', 'ejs');

// Defines the route that will use our custom router
app.use('/profile', profile)

app.get('/sheets-auth', (req, res) => {
  console.log('sheets auth raw request', req);

  res.status(200).send("Sheets auth connected to this route");
});

module.exports = app;
