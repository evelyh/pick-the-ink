// Booking Mongoose Model

const mongoose = require("mongoose");

const Booking = mongoose.model("Booking", {
  artistID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Artist", // todo: check if name matches
  },
  customerID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User", // todo: check if name matches
  },
  timeslots: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Timeslot",
  },
  isCancellable: {
    type: Boolean,
    required: true,
  },
  isModifiable: {
    type: Boolean,
    required: true,
  },
  choice: { // custom design / flash
    type: String,
  },
  flashLink: { // link to image of flash
    type: String,
  },
  // todo: ^ maybe change this to link to Image schema?
  customIdea: {
    type: String,
  },
  size: {
    type: String,
  },
  placement: {
    type: String,
  },
  otherLink: { // image / screenshot
    type: String,
  },
  concerns: {
    type: String,
  },
  duration: {
    type: Number,
    min: 1,
  },
});

module.exports = { Booking };



