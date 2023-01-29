const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  itemname: String,
  category: String,
  description: String,
});

module.exports = mongoose.model("products", UserSchema);
