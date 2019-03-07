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
  res.render('login')
  });
  
router.post("/login", (req, res) => {
  const {email, password} = req.body;

  User.findOne({"email": email})
  .then(user => {
    if(bcrypt.compare(password, user.password)) {
      req.session.user = user;
      console.log('req.session.user2', req.session.user)
      res.redirect('/books')
    } else {
      res.render('incorrect-login')
    }
  })
})
  

// // Logout
router.get('/logout', (req, res) => {
  if (!req.session.currentUser) {
    req.session.destroy((err) => {
      res.render('index', {newMessage: true})
    })
  } else res.send ("we are still in session")
  
   
    
})


module.exports = router;