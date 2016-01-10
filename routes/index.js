var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require("request").defaults({
  jar: true
});

router.get('/:username/:password', function(req, res, next) {
  request("https://github.com/login", function(index_err, index_res, index_body){
    var $ = cheerio.load(index_body);
    var utf8 = $('#login > form > div:nth-child(1) > input[type="hidden"]:nth-child(1)').val();
    var authenticity_token = $('#login > form > div:nth-child(1) > input[type="hidden"]:nth-child(2)').val();
    var commit = $('#login > form > div.auth-form-body > input.btn.btn-primary.btn-block').val();

    var opts = {
      form: {
        login: req.params.username,
        password: req.params.password,
        utf8: utf8,
        authenticity_token: authenticity_token,
        commit: commit
      }
    };

    request.post('https://github.com/session', opts, function(login_error, login_response, login_body){
      if (login_response.statusCode == 302) {
        request.get(login_response.headers.location, function(error, response, body){
          res.send(body);

          return res.end();
        });
      } else {
        res.send("Login fail");

        return res.end();
      }
    });
  });
});

module.exports = router;
