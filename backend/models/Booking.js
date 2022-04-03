// Booking Mongoose Model
const mongoose = require("mongoose");

const Booking = mongoose.model("Booking", {
  artistID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Artist",
  },
  customerID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  timeslots: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Timeslot",
    default: null,
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
    required: false,
    ref: "Image",
    default: null,
  },

  customIdea: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    required:true,
    default: null,
  },
  placement: {
    type: String,
    required:true,
    default: null,
  },
  otherLink: { // image / screenshot
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Image",
    default: null,
  },
  concerns: {
    type: String,
  },
  duration: {
    type: Number,
    min: 1,
    default: null,
  },
  isConfirmed: {
    type: Boolean,
    default: false
  }
});

module.exports = { Booking };



