module.exports = exports = function(config, app) {
  var sanitize = require("node-sanitize-options");
  config = sanitize.options(config, {
    link: "https://" + process.env.PROJECT_DOMAIN + ".glitch.me",
    endpoint: "/keepalive",
    time: 2, // 2 minutes
    consoleLog: true,
    kickStart: true
  });
  var newExpress = false;
  if (typeof app === "undefined" || !app || app === null) {
    var express = require("express");
    app = express();
    newExpress = true;
  }
  app.get(config.endpoint, function(request, response) {
    response.send("done");
  });
  if (newExpress === true) {
    const listener = app.listen(process.env.PORT, function() {
      console.log('Your app is listening on port ' + listener.address().port);
    });
  }
  var link = config.link + config.endpoint;
  var cronLink = require("node-cron-link");
  cronLink({url: link, callback: config.callback}, {time: config.time, kickStart: config.kickStart, consoleLog: config.consoleLog});
};