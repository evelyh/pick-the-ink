// Timeslot model
const mongoose = require("mongoose");

const Timeslot = mongoose.model("Timeslot", {
  artistID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  customerID:{
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: "User",
  },
  locationID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Location",
  },
  startTime: { // every timeslot has duration 1hr
    type: Date,
    required: true,
  },
  isBooked: {
    type: Boolean,
    required: true,
    default: false,
  }
});

module.exports = { Timeslot };