var mongoose = require("mongoose");

// Reference to Schema constructor
var Schema = mongoose.Schema;

// New NotesSchema object using the Schema constructor
var NoteSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        trim: true, 
        required: "Note is required."}
});

// Custom method `note date`
NoteSchema.methods.noteDate = function() {
    // Set the current `note date` property to the current date/time
    this.date = Date.now();
    // Return this date/time
    return this.date;
}

// Model is created from the above using Mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;