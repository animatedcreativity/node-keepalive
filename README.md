# node-keepalive
Keep a node project (example: Glitch) always alive.

-------------------------------------------------------

**Note:**

Works for Glitch by default. But, link can be changed to make it work for other projects too.

-------------------------------------------------------

**Usage:**

```
var keepAlive = require("node-keepalive");
keepAlive(config, expressApp);
```

config (Everything is optional):
- link: "https://" + process.env.PROJECT_DOMAIN + ".glitch.me", // project link
- endpoint: "/keepalive" // dummy endpoint to keep calling to keep the project alive.
- time: 2 // call endpoint every 2 minutes
- consoleLog: true // show log in console
- kickStart: true // if true will call endpoint right away without waiting for set time.
- callback: function(error, response, body) {} // callback function when endpoint is called

expressApp:
- An express app variable. Providing app is necessary to avoid conflict of listening ports. If app is not provided then its assumed that no other express app is listening and a new one is created to listen at default port.

--------------------------------------------------

**Example (without providing express app):**

```
var keepAlive = require("node-keepalive");
keepAlive();
```

**Example (with existing express app):**

```
var express = require('express');
var app = express();

var keepAlive = require("node-keepalive");
keepAlive({}, app);

// ....... other endpoints

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

```

**Example (with config):** Everything is optional.

```
var keepAlive = require("node-keepalive");
keepAlive({
  link: "https://" + process.env.PROJECT_DOMAIN + ".glitch.me", // project link
  endpoint: "/keepalive",
  time: 2, // 2 minutes
  consoleLog: true,
  kickStart: true,
  callback: function(error, response, body) {
    console.log(error, response, body);
  }
});
```