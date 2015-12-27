var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

var LOGIN_URL = "https://github.com/login";

casper.start(LOGIN_URL, function(){
  this.echo("Loaded login page");

  this.fill("#login > form", {
    "login": casper.cli.args[0],
    "password": casper.cli.args[1]
  }, true);
});

casper.then(function(){
  this.capture("github.png");
});

casper.run();
