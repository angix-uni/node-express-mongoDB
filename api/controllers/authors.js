const Book = require("../models/author");

exports.authors_get_all = (req, res, next) => {
    Author.find()
    .exec()
    .then(authors => {
        res.status(200).json({ 
        Message: "List of all authors",
        info: authors,
    });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Error",
            info: err,
            });
    })
}

exports.authors_add = (req, res, next) => {
    console.log(req.file);

    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.price,
        
    })

    author
    .save()
    .then(result => {
        res.status(200).json({ 
            Message: "New author added",
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
exports.authors_get = (req, res, next) => {
    const id = req.params.authorId;
    Author.findById(id)
    .exec()
    .then((author) => {
        res.status(200).json({ 
        Message: "Details of author number " + id,
        info: author,
    });
})
    .catch((err) => {
        res.status(500).json({ 
            Message: "Error",
            info: err,
            });
    })}
exports.authors_change = (req, res, next) => {
    const id = req.params.authorId;
    const author = {
        name: req.body.name,
        surname: req.body.price,
    }

    Author.findByIdAndUpdate(id, author, {new: true})
    .exec()
    .then(newAuthor => {
        res.status(200).json({ 
            Message: "Data changed for author number  " + id,
            newData: newAuthor,
        });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Error",
            info: err,
            });
    })}
    exports.authors_del = (req, res, next) => {
        const id = req.params.authorId;
        Author.findByIdAndRemove(id)
        .exec()
        .then(author => {
            res.status(200).json({ Message: "Author deleted " + id})
        })
        .catch((err) => {
            res.status(500).json({ 
                Message: "Error",
                info: err,
                });
        })
        
    }
