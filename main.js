var system = require("system");
var args = system.args;
var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

var LOGIN_URL = "https://github.com/login";

casper.start(LOGIN_URL, function(){
  this.echo("Loaded login page");

  this.fill("#login > form", {
    "login": args[4],
    "password": args[5]
  }, true);
});

casper.then(function(){
  this.capture("github.png");
});

casper.run();
