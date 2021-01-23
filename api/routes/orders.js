const express = require("express");
const mongoose = require("mongoose");
const { findByIdAndUpdate } = require("../models/order");
const router = express.Router();

const Order = require("../models/order");
const checkAuth = require("../middleware/check-auth")

router.get("/",(req, res,next) => {
    Order.find()
    .exec()
    .then(orders => {
        res.status(200).json({ 
        Message: "List of all orders",
        info: orders
    });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Error",
            info: err,
            });
    })
});

router.post("/", checkAuth, (req, res,next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        items: req.body.items,
        price: req.body.price,
    })
    order
    .save()
    .then(result => {

        res.status(200).json({ 
            Message: "New order added",
            info: result,
            });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Error",
            info: err,
            });
    });

});

router.get("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
    .exec()
    .then((order) => {
        res.status(200).json({ 
        Message: "Details for order number " + id,
        info: order,
    });
})
    .catch((err) => {
        res.status(500).json({ 
            Message: "Error",
            info: err,
            });
    });
});

router.patch("/:orderId", checkAuth, (req, res, next) => {
    const id = req.params.orderId;
    const order = {
        items: req.body.items,
        price: req.body.price,
    }
    Book.findByIdAndUpdate(id, book, {new: true})
    .exec()
    .then(newOrder => {
        res.status(200).json({ 
            Message: "Changed data for order number  " + id,
            newData: newOrder,
        });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Error",
            info: err,
            });
    })
});

router.delete("/:orderId", checkAuth, (req, res, next) => {
    const id = req.params.orderId;
    Order.findByIdAndRemove(id)
    .exec()
    .then(order => {
        res.status(200).json({ Message: "Deleted order number " + id})
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Error",
            info: err,
            });
    })
});

module.exports = router;
