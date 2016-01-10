var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require("request").defaults({
  jar: true
});

router.post('/github/login', function(req, res, next) {
  request("https://github.com/login", function(index_err, index_res, index_body){
    var $ = cheerio.load(index_body);
    var utf8 = $('#login > form > div:nth-child(1) > input[type="hidden"]:nth-child(1)').val();
    var authenticity_token = $('#login > form > div:nth-child(1) > input[type="hidden"]:nth-child(2)').val();
    var commit = $('#login > form > div.auth-form-body > input.btn.btn-primary.btn-block').val();

    var opts = {
      form: {
        login: req.body.username,
        password: req.body.password,
        utf8: utf8,
        authenticity_token: authenticity_token,
        commit: commit
      }
    };

    request.post('https://github.com/session', opts, function(login_error, login_response, login_body){
      if (login_response.statusCode == 302) {
        // login success
        request.get("https://github.com/settings/applications", function(apps_error, apps_response, apps_body){
          $ = cheerio.load(apps_body);

          var oauth_apps = $("[id^='oauth-access-'] > div.table-list-cell.oauth-info-cell");
          var apps = [];

          oauth_apps.each(function(i, elem){
            apps.push($(elem).find("a").first().text());
          });

          return res.json(apps);
        });
      } else {
        res.send("Login fail");

        return res.end();
      }
    });
  });
});

module.exports = router;
