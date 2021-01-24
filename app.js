const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");


const app = express();

mongoose.connect(YOUR MONGODB CONNECTION,
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});


const bookRoutes = require("./api/routes/books");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");
const authorRoutes = require("./api/routes/authors");

app.use("/uploads", express.static("uploads"))

app.use(morgan("combined"));
app.use(bodyParser.json());


app.use("/books", bookRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/authors", authorRoutes);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            Message: error.message
        }
    })
})

module.exports = app;
