const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const profile = require('./profile');


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'ejs');


// then define the route that will use your custom router
app.use('/profile', profile)


app.listen(8080, () => console.log('Server running on http://localhost:8080'))