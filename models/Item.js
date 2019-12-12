var mongoose = require("mongoose");

// Reference to Schema constructor
var Schema = mongoose.Schema;

// New ItemsSchema object using Schema constructor
var ItemSchema = new Schema({
    item_brand: {
        type: String,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    sale_price: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    item_link: {
        type: String,
        required: true
    },
    // `note` is an object that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Article with an associated Note
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// Model is created from the above using Mongoose's model method
var Item = mongoose.model("Item", ItemSchema);

module.exports = Item;