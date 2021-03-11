var mongoose = require("mongoose");

var Message = mongoose.model("Message", {
  from: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  createdAt: {
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
  userId: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
});

module.exports = { Message };
