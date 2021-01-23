const Book = require("../models/book");

exports.books_get_all = (req, res, next) => {
    Book.find()
    .exec()
    .then(books => {
        res.status(200).json({ 
        Message: "List of all books",
        info: books,
    });
    })
    .catch((err) => {
        res.status(500).json({ 
            Messgae: "Error",
            info: err,
            });
    })
}

exports.books_add = (req, res, next) => {
    console.log(req.file);

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        author: req.body.author,
        bookImage: req.file.path,
    })

    book
    .save()
    .then(result => {
        res.status(200).json({ 
            Message: "New book added",
            info: result,
        });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Error",
            info: err,
        });
    });

}
exports.books_get = (req, res, next) => {
    const id = req.params.bookId;
    Book.findById(id)
    .exec()
    .then((book) => {
        res.status(200).json({ 
        Message: "Details of book number " + id,
        info: book,
    });
})
    .catch((err) => {
        res.status(500).json({ 
            Message: "Error",
            info: err,
            });
    })}
exports.books_change = (req, res, next) => {
    const id = req.params.bookId;
    const book = {
        name: req.body.name,
        price: req.body.price,
        author: req.body.author
    }

    Book.findByIdAndUpdate(id, book, {new: true})
    .exec()
    .then(newBook => {
        res.status(200).json({ 
            Message: "Data changed for book number  " + id,
            newData: newBook,
        });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Error",
            info: err,
            });
    })}
    exports.books_del = (req, res, next) => {
        const id = req.params.bookId;
        Book.findByIdAndRemove(id)
        .exec()
        .then(book => {
            res.status(200).json({ Message: "Book deleted " + id})
        })
        .catch((err) => {
            res.status(500).json({ 
                Message: "Error",
                info: err,
                });
        })
        
    }
