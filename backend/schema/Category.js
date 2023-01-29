const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  category: String
});

module.exports = mongoose.model("categories", UserSchema);
