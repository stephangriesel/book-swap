const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');

// HBS
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + "/views/partials");

// Middleware bodyParser logic
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Node mailer
app.post('/send', (req, res) => {
    console.log(req.body);
    // const output = `
    // <p>You have a new book request</p>
    // <h3>Contact Details</h3>
    // <ul>
    //   <li>Email: ${email}</li>
    //   <li>Name: ${title}</li>
    //   <li>Author: ${author}</li>
    //   <li>Language: ${language}</li>
    //   <li>Year: ${year}</li>
    // </ul>
    // `;
  });

  module.exports = router;