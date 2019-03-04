const express = require('express');
const router = express.Router();

// Get the books
router.get('/books', (req, res) => {
    Book.find()
        .then(books => {
            res.render("books", { books })
        })
        .catch(error => {
            console.log(error)
        })
});

// Add book
router.get("/books/add", (req, res, next) => {
    res.render("book-add")
});

router.post('/books/add', (req, res, next) => {
    const {
        title,
        author,
        imageLink,
        language,
        year
    } = req.body;
    const newBook = new Book(
        {
            title,
            author,
            imageLink,
            language,
            year
        }
    );
    newBook.save()
        .then((book) => {
            res.redirect('/books');
        })
        .catch((error) => {
            console.log(error);
        })

});

// Edit the book
router.get('/books/edit', (req, res, next) => {
    Book.findOne({ _id: req.query.book_id }) 
        .then((book) => {
            res.render("book-edit", { book });
        })
        .catch((error) => {
            console.log(error);
        })
});

// Update the book
router.post('/books/edit', (req, res, next) => {
    const {
        title,
        author,
        imageLink,
        language,
        year
    } = req.body;
    Book.update({ _id: req.query.book_id }, {
        $set:
        {
            title,
            author,
            imageLink,
            language,
            year
        }
    },
        { new: true }
    )
        .then((book) => {
            res.redirect('/books');
        })
        .catch((error) => {
            console.log(error);
        })
});

// Remove book
router.get('/books/remove', (req, res, next) => {
    Book.findOneAndRemove({ _id: req.query.book_id })
        .then((book) => {
            res.render("book-remove", { book });
        })
        .catch((error) => {
            console.log(error);
        })
});

const Book = require('../models/book');

module.exports = router;