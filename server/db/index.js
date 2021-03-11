const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/chat_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { mongoose };
