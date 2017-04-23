// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require('fs');

// Sets up the Express App
// =============================================================
var app = express();
var server = app.listen(3000, listening);

function listening(argument) {
	console.log("listening. . . ");
}

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));




var htmlRoutes = require('./app/routing/html-routes');
app.use('/', htmlRoutes);


var apiRoutes = require('./app/routing/api-routes');
app.use('/api', apiRoutes);

