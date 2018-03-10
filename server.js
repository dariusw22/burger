// Dependencies
var express = require('express');
var body-parser = require('body-parser');

// Create an instance of the express app.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// data array

const data = [
    // making the JSON object for the data to live with the perimeters
    {},
];

//Routes
app.get('/data/:name', (req, res) => {
    for (let i = 0; i < data.length; i++) {
        return res.render("data", data[i]);
    }
});



