const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Book = require('../models/book');


// Get the books
router.get('/books', (req, res, next) => {
    Book.find({})
        .populate("user") // refers to book model data type
        .then(books => {
            res.render("books", { displayDataBooks: books });
            console.log("booksdata", books)
        })
        .catch(error => {
            console.log(error)
        });

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
    // const userId = req.signedCookies.userId; // when I was using cookie approach
    debugger
    const userId = req.session.user // not working with session
    debugger
    const newBook = new Book(
        {
            title: title,
            author: author,
            imageLink: imageLink,
            language: language,
            year: year,
            user: userId // details of user that uploaded the book
        }
    );
    newBook.save()
        .then((book) => {
            debugger
            User.findByIdAndUpdate(userId, { $push: { books: book._id } }).then(updatedUser => { // push into mongo array
                debugger;
                res.redirect('/books');

            })
        })
        .catch((error) => {
            debugger
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

// Swap the book
router.get('/books/swap', (req, res, next) => {
    Book.findOne({ _id: req.query.book_id })
        .then((book) => {
            res.render("book-swap", { book });
        })
        .catch((error) => {
            console.log(error);
        })
});

router.post('/book-swap-request', (req,res,next) => {
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
            res.redirect('/book-swap-request');
        })
        .catch((error) => {
            console.log(error);
        })
})

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

module.exports = router;