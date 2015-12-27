var express = require('express');
var router = express.Router();
var request = require("request").defaults({
  jar: true
});

/* GET home page. */
router.get('/:username/:password', function(req, res, next) {
  request('http://www.google.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage. 

      res.render('index', { title: 'Express' });
    }
  });
});

module.exports = router;
