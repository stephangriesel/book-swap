// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// var bodyParser = require('body-parser');

// // Parser 
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

// // Signup
// // router.post("/signup", (req, res) => {
// //     debugger
  
  
// //     const name = req.body.name;
// //     const lastname = req.body.lastname;
// //     const email = req.body.email;
// //     const password = req.body.password;
// //     debugger;
// //     if (name === "" || password === "") {
// //       res.render("auth/signup", {
// //         errorMessage: "Indicate a username and a password to sign up"
// //       });
// //       return;
// //     } bcrypt.hash(password, saltRounds).then( hash => {
// //       let newUser = {
// //         name:name,
// //         lastname:lastname,
// //         email:email,
// //         password:hash
// //       }
  
// //       return newUser;
  
// //     }).then( newUser => {
// //       User.create(newUser)
// //       res.redirect("/login")
// //     })
// //       .catch(error => {
// //         debugger
// //         console.log(error);
// //       })
// //   });

// // Logout




// module.exports = router;