const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");


const BookController = require("../controllers/books")

const checkAuth = require("../middleware/check-auth")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(':', '_').replace(':', '-') +
        file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024*1024*5
},
    fileFilter: fileFilter,
});


router.get("/", BookController.books_get_all)

const Book = require("../models/book");

router.get("/", BookController.books_get_all);

router.post("/", upload.single("bookImage"), checkAuth, BookController.books_add);

router.get("/:bookId", BookController.books_get);

router.patch("/:bookId", checkAuth, BookController.books_change);

router.delete("/:bookId", checkAuth, BookController.books_del);

module.exports = router;
