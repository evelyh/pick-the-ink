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
    required:true
  },
  flashLink: { // link to image of flash
    type: mongoose.SchemaTypes.ObjectId,
  },
  // todo: ^ maybe change image links to link to Image schema?
  customIdea: {
    type: String,
  },
  size: {
    type: String,
    required:true
  },
  placement: {
    type: String,
    required:true
  },
  otherLink: { // image / screenshot
    type: mongoose.SchemaTypes.ObjectId,
  },
  concerns: {
    type: String,
  },
  duration: {
    type: Number,
    min: 1,
    default: 1,
  },
  isConfirmed: {
    type: Boolean,
    default: false
  }
});

module.exports = { Booking };



