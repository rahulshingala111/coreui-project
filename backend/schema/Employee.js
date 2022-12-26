const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  contact: String,
  createdBy: String,
});

module.exports = mongoose.model("employee", UserSchema);
