const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var bodyParser = require('body-parser');

//Login
router.get('/login', (req, res) => {
    if (req.signedCookies && req.signedCookies.email) {
      res.render('profile')
    } else {
      res.render('login')
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

module.exports = router;