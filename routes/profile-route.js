const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Book = require('../models/book');

router.get('/profile', (req, res) => { 
    Book.findOne({}) //email: req.session.email
    .then(books => {
        // if (req.session.user)
        res.render("profile", {displayDataBooks: books });
    })
    .catch(error => {
        console.log(error)
    });
});
   


module.exports = router;