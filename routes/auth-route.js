const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var bodyParser = require('body-parser');
var session = require('client-sessions');

// Parser 
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Signup
router.get("/signup", (req, res) => {
  res.render("signup")
});

router.post("/signup", (req, res) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  if (name === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  } bcrypt.hash(password, saltRounds).then(hash => {
    let newUser = {
      name: name,
      lastname: lastname,
      email: email,
      password: hash
    }

    return newUser;

  }).then(newUser => {
    User.create(newUser)
    res.redirect("/login")
  })
    .catch(error => {
      debugger
      console.log(error);
    })
});

// LOGIN

router.post('/login', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) {
      res.render('login', { error: 'Invalid credentials' });
    } else {
      if (bcrypt.compare(req.body.password, user.password)) {
        // set cookie with user data
        req.session.user = user;
        res.cookie("email", req.body.email, { signed: true }); 
        res.cookie("userId", user._id, { signed: true });     
        res.redirect('/books');
      } else {
        res.render('login', { error: 'Invalid credentials' })
      }
    }
  })
});

router.get('/login', (req, res) => {
  if (req.session.currentUser) {
    req.session((err) => {
      res.render('books', { newMessage: true })
    })
  } else res.render("login")     
});

router.get('/logout', function (req, res) {
  res.clearCookie('email'); 
  res.clearCookie('userId'); 
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
