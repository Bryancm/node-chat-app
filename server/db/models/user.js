var mongoose = require("mongoose");

var User = mongoose.model("User", {
  id: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  room: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
});

module.exports = { User };
