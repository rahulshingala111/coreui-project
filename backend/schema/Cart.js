const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        productId: mongoose.Schema.Types.ObjectId,
        qty: Number,
    }
);

module.exports = mongoose.model("cart", UserSchema);
