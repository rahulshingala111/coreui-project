const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        productid: mongoose.Schema.Types.ObjectId,
        userid: String,
        qty: Number,
    }
);

module.exports = mongoose.model("cart", UserSchema);
