const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
//const profile = require('./profile');


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'ejs');


// then define the route that will use your custom router
//app.use('/profile', profile)


app.get('/', function (req, res) {
  res.render('index');
});
// define the contact route
app.get('/contact', function (req, res) {
    res.render('contact');
});
// define the thanks route
app.get('/thanks', function (req, res) {
    res.render('thanks');
});

app.post('/thanks', (req, res) => {
  console.log('Inside Thanks');
  res.render('thanks', { contact: req.body })
  });

app.listen(8080, () => console.log('Server running on http://localhost:8080'))