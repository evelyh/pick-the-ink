const mongoose = require("mongoose");

const Style = mongoose.model("Style", {
  name: {
    type: String,
    required: true,
  },
});

module.exports = { Style };