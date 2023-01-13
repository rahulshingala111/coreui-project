const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  contact: String,
  createdBy: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("employee", UserSchema);
