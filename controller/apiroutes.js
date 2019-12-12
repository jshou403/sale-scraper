// Import model for controller to use database functions
var db = require("../models");
// Import express package
var express = require("express");
// Import express router 
var router = express.Router();

var axios = require("axios");
var cheerio = require("cheerio");

// Item Model = db.Item
// Note Model = db.Note

// Routes

// Main route 
router.get("/", function (req, res) {
  console.log("Hello world");
  res.send("Hello world!!!")
  // db.Item.find({}) 
  //   .then(function (data) {

  //     console.log(data);
  //     res.json(data);
  //   });

});

// A GET route for scraping website
router.get("/scrape", function (req, res) {
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

      // Add the text and href of every link, and save them as properties of the result object
      // result.title = $(this)
      //   .children("a")
      //   .text();
      // result.link = $(this)
      //   .children("a")
      //   .attr("href");

      console.log("\n" + i);
      console.log(result);

      // Create a new Article using the `result` object built from scraping
      db.Item.create(result)
        .then(function (dbItem) {
          // View the added result in the console
          // console.log(dbItem);
        })
        .catch(function (err) {
          // If an error occurred, log it
          // console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

module.exports = router;