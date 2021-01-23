const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type:String,
        required: true,
        unique: true
    },
    price: {
       type: Number,
       required: true,
       min: 0
    },
    author: {
        type:String,
        required: true,
        unique: true
    },
    bookImage: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model("Book", booksSchema);