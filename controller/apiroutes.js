// Import model for controller to use database functions
var db = require("../models");
// Import express package
var express = require("express");
// Import express router 
var apirouter = express.Router();

var axios = require("axios");
var cheerio = require("cheerio");

// Item Model = db.Item
// Note Model = db.Note

// Routes

// A GET route for scraping the shopping website
// Then sending the scrape results back to the front end GET request 
apirouter.get("/scrape", function (req, res) {
  console.log("Scraping...");
  // First, we grab the body of the html with axios
  axios.get("https://needsupply.com/life/sale?lang=en_US&srule=newest&start=0&sz=48").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Grab every within an article tag, and do the following:
    $(".product-tile").each(function (i, element) {
      // Save an empty result object
      var result = {};

      result.item_brand = $(element).attr("data-brand");
      result.item_name = $(element).attr("data-name");
      result.sale_price = $(element).attr("data-price");
      result.image_url = $(element)
        .children().find("img").attr("data-src");
      result.item_link = "https://needsupply.com" + $(element)
        .children().eq(1).find("a").attr("href");

      console.log("\n" + i);
      console.log(result);

      // Create a new Item in Mongo database using the `result` object built from scraping
      db.Item.create(result)
        .then(function (dbItem) {
          // View the added result in the console
          console.log(dbItem);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

// A DELETE route to REMOVE unsaved items from database
apirouter.delete("/clear", function (req, res){
  db.Item.remove({ saved: false }, function (result) {
    res.send("Database cleared.")
  })
});

// A DELETE route to REMOVE saved items from database
apirouter.delete("/clear_saved", function (req, res){
  db.Item.remove({ saved: true }, function (result) {
    res.send("Database cleared.")
  })
});

// A DELETE route to REMOVE specific saved item from database
apirouter.delete("/delete_item/:id", function (req, res){
  db.Item.remove({ _id: req.params.id}, function (result) {
    res.send("Item deleted.")
  })
});

// An UPDATE route for saving items - Update save to true 
// A PUT route to UPDATE item status to saved
apirouter.put("/save_item/:id", function (req, res) {
  db.Item.update({ _id: req.params.id}, {$set: { saved: true }}, function (result) {
    res.send("Item saved.")
  })
});

// A PUT route to UPDATE item status to unsaved
apirouter.put("/unsave_item/:id", function (req, res) {
  db.Item.update({ _id: req.params.id}, {$set: { saved: false }}, function (result) {
    res.send("Item unsaved.")
  })
});

module.exports = apirouter;