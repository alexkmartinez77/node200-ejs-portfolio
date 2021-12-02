var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
});
// define the home page route
router.get('/', function (req, res) {
  res.render('index');
});
// define the contact route
router.get('/contact', function (req, res) {
    res.render('contact');
});
// define the thanks route
router.get('/thanks', function (req, res) {
    res.render('thanks');
})
;
module.exports = router;