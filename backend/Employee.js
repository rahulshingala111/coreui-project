const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  username: String,
  password: String,
  contact: String,
  createdBy: String
});

module.exports = mongoose.model("employee", UserSchema);
