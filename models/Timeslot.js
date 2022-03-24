// Timeslot model
const mongoose = require("mongoose");

const Timeslot = mongoose.model("Timeslot", {
  artistID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Artist", // todo: check to match schema name
  },
  locationID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Location", // todo: check to match schema name
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