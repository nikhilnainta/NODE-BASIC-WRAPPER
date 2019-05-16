
// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// Add routes
var otpRouter = require('./routes/otp');

// Create a new express server
var app = express();

var bodyParser = require('body-parser');

/* parse application/json */
app.use(bodyParser.json())

// Intercept and modify all requests's query parameters to lowercase
app.use(function(req, res, next) {
    for (var key in req.query) {
        req.query[key.toLowerCase()] = req.query[key];
    }
    next();
});


app.use(otpRouter);


// Start server on the specified port and binding host
app.listen(3000, '0.0.0.0', function() {
  // Print a console message when the server starts listening
  console.log('server starting on port 3000');

});



