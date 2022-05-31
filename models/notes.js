const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ImagesSchema = require('./images').schema

const NotesSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        note: {
            type: String,
            requied: true,
        },
        time: {
            type: Date, 
            required: true
        },
        images: [ImagesSchema]

    },
    { timestamps: true }
);

NotesSchema.statics.format = notes => {
    return {
        note: notes.note
    };
};

module.exports = mongoose.model("Notes", NotesSchema);