const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const profile = require('./profile');


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Sets up ejs template engine to look in the views directory for templates
app.set('views', './views');
app.set('view engine', 'ejs');

// Defines the route that will use our custom router
app.use('/profile', profile)


app.listen(8080, () => console.log('Server running on http://localhost:8080'))