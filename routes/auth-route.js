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

// NEW Login

// --> https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions

// router.post('/login', function (req, res) {
//   User.findOne({ email: req.body.email }, function (err, user) { // we are referring to POST here, should it be req.body.username?
//     if (!user) {
//       res.render('login', { error: 'Invalid credentials' });
//     } else {
//       if (req.body.password === user.password) {
//         // set cookie with user data
//         req.session.user = user;
//         res.cookie("email", req.body.email, { signed: true }); // <--- The old way I did it, just keeping it in here for now
//         res.cookie("userId", user._id, { signed: true });      // <--- The old way I did it, just keeping it in here for now
//         res.redirect('/books');
//       } else {
//         res.render('login', { error: 'Invalid credentials' })
//       }
//     }
//   })
// })

// /* Modify it to check for a session, 
//    lookup the user in your database 
//    and expose the user’s profile fields 
//    as variables for the template:
 
//   ...but we don't want to rewrite this 
//      for every route */

// // router.get('/login', function(req,res){ // 
// //   if(req.session && req.session.user) {
// //     User.findOne({ email: req.session.user.email }, function (err, user){
// //       if(!user) {
// //         req.session.reset();
// //         res.redirect('/login')
// //       } else {
// //         res.locals.user = user // Review
// //         res.render('login');
// //       }
// //     });
// //   } else {
// //     res.redirect('/login')
// //   }
// // });

// // -->>> We would rather make it into a global middleware function.

// router.use(function(req, res, next) {
//   if (req.session && req.session.user) {
//     User.findOne({ email: req.session.user.email }, function(err, user) {
//       if (user) {
//         req.user = user;
//         delete req.user.password; // delete the password from the session
//         req.session.user = user;  //refresh the session value
//         res.locals.user = user;
//       }
//       // finishing processing the middleware and run the route
//       next();
//     });
//   } else {
//     next();
//   }
// });

// router.get('/books', requireLogin, function(req, res) {
//   res.render('books');
// });

// function requireLogin (req, res, next) {
//   if (!req.user) {
//     res.redirect('/login');
//   } else {
//     next();
//   }
// };

// OLD LOGIN

router.get('/login', (req, res) => {
  if (req.session.currentUser) {
    req.session((err) => {
      res.render('books', { newMessage: true })
    })
  } else res.render("login")
});

router.post("/login", (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  User.findOne({ "email": email })
    .then(user => {
      if (bcrypt.compare(password, user.password)) {
        res.cookie("email", req.body.email, { signed: true });
        res.cookie("userId", user._id, { signed: true });
        req.session.user = user;
        console.log('req.session.user2', req.session.user)
        res.redirect('/books')
      } else {
        res.render('incorrect-login')
      }
    })
})

// router.get('/logout', function(req, res) {
//   // res.clearCookie('email'); // <-- Leaving this in here for now...
//   req.session.reset();
//   res.redirect('/');
// });

// // OLD LOGOUT
router.get('/logout', (req, res) => {
  
  if (!req.session.currentUser) {
    req.session.destroy((err) => {
      res.render('index', { newMessage: true })
    })
  } else res.send("we are still in session");
  res.clearCookie('email');



})


module.exports = router;