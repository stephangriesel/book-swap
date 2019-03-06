const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.clearCookie('email');
  res.clearCookie('userId');
  req.session.destroy('basic-auth-secret');
  res.redirect("/");
})

module.exports = router;

