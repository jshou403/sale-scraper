$(function () {

    // index page - on click of scrape
    $("#scrape").on("click", function (event) {
        event.preventDefault();
        console.log("Scrape button clicked.");
        $.ajax("/scrape", {
            type: "GET"
        }).then(function () {
            location.reload();
        });
    });

    // index page - on click of save
    $(".save-item").on("click", function (event) {
        event.preventDefault();
        var item_id = $(this).attr("data-id");
        console.log("Save item button clicked.");
        console.log("Saved Item ID: " + item_id);
        $.ajax("/save_item/" + item_id, {
            type: "PUT",
            data: { saved: true },
        }).then(function () {
            location.reload();
        });
    });

    // index page and saved paged - clear all items 
    $("#clear").on("click", function(event) {
        event.preventDefault();
        console.log("Clear all button clicked.");
        $.ajax("/clear", {
            type: "DELETE"
        }). then (function () {
            location.reload();
        })
    });

    // saved page click functions
    $(".delete-item").on("click", function () {

    });

    $(".view-note").on("click", function () {

    });

    $(".add-note").on("submit", function (event) {
        event.preventDefault();
    });

    $(".delete-note").on("click", function () {

    });

});