const mongoose = require("mongoose");

const Style = mongoose.model("Style", {
  styleName: {
    type: String,
    required: true,
  },
});

module.exports = { Style };