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

    $("#clear-saved").on("click", function(event) {
        event.preventDefault();
        console.log("Clear all button clicked.");
        $.ajax("/clear_saved", {
            type: "DELETE"
        }). then (function () {
            location.reload();
        })
    });

    $(".delete-item").on("click", function(event) {
        event.preventDefault();
        var item_id = $(this).attr("data-id");
        console.log("Delete item button clicked");
        console.log("Deleting Item ID: " + item_id);
        $.ajax("/delete_item/" + item_id , {
            type: "DELETE"
        }). then (function () {
            location.reload();
        })
    });

    $(".remove-item").on("click", function (event) {
        event.preventDefault();
        var item_id = $(this).attr("data-id");
        console.log("Remove item button clicked.");
        console.log("Unsaved Item ID: " + item_id);
        $.ajax("/unsave_item/" + item_id, {
            type: "PUT",
            data: { saved: false },
        }).then(function () {
            location.reload();
        });
    });

    $(".item-notes").on("click", function (event) {
        event.preventDefault();
        console.log("Item notes button clicked.");
        // Ajax call to trigger the notes/comment section to show up below for the item
    });

    $(".add-note").on("submit", function (event) {
        event.preventDefault();
    });

    $(".delete-note").on("click", function (event) {
        event.preventDefault();
    });

});