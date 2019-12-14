// Import model for controller to use database functions
var db = require("../models");
// Import express package
var express = require("express");
// Import express router 
var htmlrouter = express.Router();

var axios = require("axios");
var cheerio = require("cheerio");

// Item Model = db.Item
// Note Model = db.Note

// Routes

// Main route - Finds all Items not saved to front page
htmlrouter.get("/", function (req, res) {
  db.Item.find({ saved: false }).then(function (data) {
    var hbsObject = {
      items: data
    }
    //     console.log(data);
    res.render("index", hbsObject);
  });

});

// Saved route - Finds all saved Items /saved route
htmlrouter.get("/saved", function (req, res) {
    console.log("Hello world");
    db.Item.find({ saved: true }).then(function (data) {
      var hbsObject = {
        items: data
      }
      //     console.log(data);
      res.render("index", hbsObject);
    });
  
  });

module.exports = htmlrouter;