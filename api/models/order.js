const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    items: String,
    price: Number,
});

module.exports = mongoose.model("Order", ordersSchema);