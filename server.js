var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Scraping tools: Axios and Cherrio
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Middleware config:
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes to give server access
var apirouter = require("./controller/apiroutes");

app.use(apirouter);

var htmlrouter = require("./controller/htmlroutes");

app.use(htmlrouter);

// Connect to the Mongo DB and creates/sets up database
mongoose.connect("mongodb://localhost/sale-scraper", { useNewUrlParser: true, useUnifiedTopology: true });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/sale-scraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useCreateIndex', true);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

module.exports = app;