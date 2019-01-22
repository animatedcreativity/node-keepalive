# node-glitch-keepalive
Keep a Glitch project always alive.

-------------------------------------------------------

**Usage:**

```
var keepAlive = require("node-glitch-keepalive");
keepAlive(config, expressApp);
```

config:
- endpoint: "/keepalive" // dummy endpoint to keep calling to keep the Glitch project alive.
- time: 2 // call endpoint every 2 minutes
- consoleLog: true // show log in console
- kickStart: true // if true will call endpoint right away without waiting for set time.
- callback: function(error, response, body) {} // callback function when endpoint is called

expressApp:
- An express app variable. Providing app is necessary to avoid conflict of listening ports. If app is not provided then its assumed that no other express app is listening and a new one is created to listen at default port.

--------------------------------------------------

**Example (without providing express app):**

```
var keepAlive = require("node-glitch-keepalive");
keepAlive();
```

**Example (with existing express app):**

```
var express = require('express');
var app = express();

var keepAlive = require("node-glitch-keepalive");
keepAlive({}, app);

// ....... other endpoints

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

```

**Example (with config):**

```
var keepAlive = require("node-glitch-keepalive");
keepAlive({
  endpoint: "/keepalive",
  time: 2, // 2 minutes
  consoleLog: true,
  kickStart: true,
  callback: function(error, response, body) {
    console.log(error, response, body);
  }
});
```