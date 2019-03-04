const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var bodyParser = require('body-parser');


// Parser 
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Signup
router.post("/signup", (req, res) => {
  debugger


  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  debugger;
  if (name === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  } bcrypt.hash(password, saltRounds).then( hash => {
    let newUser = {
      name:name,
      lastname:lastname,
      email:email,
      password:hash
    }

    return newUser;

  }).then( newUser => {
    User.create(newUser)
    res.redirect("/login")
  })
    .catch(error => {
      debugger
      console.log(error);
    })
});

//Login
router.get('/login', (req, res) => {
  if (req.signedCookies && req.signedCookies.email) {
    res.render('profile') // ('profile', {email:req.signedCookies.email})
  } else {
    res.render('login')// res.render('profile.hbs', {notFound: "USER HAS NOT BEEN FOUND"})
  }
})

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.send("error")
    else if (!user) { res.send("Incorrect, try again") }
    else {
      bcrypt.compare(req.body.password, user.password, (err, equal) => {
        if (equal) {
          res.cookie("email", req.body.email, { signed: true })
          res.redirect("profile")
        }
        else {
          res.send("Incorrect, try again")
        }
      });
    }
  })
})

router.get('/profile', (req, res) => {
  User.findOne({ email: req.signedCookies.email }, (err, user) => {
    if (req.signedCookies.email) {
      res.render('profile', { user })
    } else {
      res.redirect('login')
    }
  })
})

// Logout

router.get('logout', (req, res) => {
  res.clearCookie('email');
  res.redirect('/');
})


module.exports = router;