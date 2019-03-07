const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { 
    res.render("index");
    res.clearCookie('email'); 
    res.clearCookie('userId'); 
    req.session.destroy();
});

module.exports = router;