$(function () {

    // index page - on click of scrape
    $("#scrape").on("click", function (event) {
        event.preventDefault();
        console.log("Scrape button clicked.")
        $.ajax("/scrape", {
            type: "GET",
        }).then(function () {
            location.reload()
        });
    });

    // index page - on click of save
    $(".save-item").on("click", function (event) {
        event.preventDefault();
        console.log("Save item button clicked.")
        $.ajax("/save_item", {
            type: "GET",
        }).then(function () {
            location.reload()
        });
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