const express = require('express')
const router = express.Router();

router.use(function (req, res, next) {
    if (req.session && req.session.user) {
        User.findOne({ email: req.session.user.email }, function (err, user) {
            if (user) {
                req.user = user;
                delete req.user.password; // delete the password from the session
                req.session.user = user;  //refresh the session value
                res.locals.user = user;
            }
            // finishing processing the middleware and run the route
            next();
        });
    } else {
        next();
    }
});

function requireLogin(req, res, next) {
    if (!req.user) {
        res.render('/login');
    } else {
        next();
    }
}

router.get('/books', requireLogin, function (req, res) {
    res.render('books');
});


module.exports = router;