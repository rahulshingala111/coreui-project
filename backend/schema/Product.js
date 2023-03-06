const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    itemname: String,
    category: String,
    description: String,
    image: String,
    isCart: Boolean
  }
);

module.exports = mongoose.model("products", UserSchema);
