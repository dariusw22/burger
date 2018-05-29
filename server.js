// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const exphbs = require("express-handlebars");

// Set the port of the application
const PORT = process.env.PORT || 8080;

// Instantiate the express app.
const app = express();

// Require routes 
var routes = require('./routes');

// Designate the public folder as the static directory 
app.use(express.static('public'));

// Connect Handlebars to our Express app
app.engine('handlebars', exphbs({defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use bodyParser in our app
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

// Have every request go through our route middleware
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

// Listen on the port
app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});




