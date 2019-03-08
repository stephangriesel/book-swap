const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');

// Node mailer
app.post('/send', (req, res) => {
  console.log(req.body);
  const output = `
  <p>You have a new book request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Email: ${req.body.email}</li>
    <li>Name: ${req.body.title}</li>
    <li>Author: ${req.body.author}</li>
    <li>Language: ${req.body.language}</li>
    <li>Year: ${req.body.year}</li>
  </ul>
  `;

  async function main(){

  let transporter = nodemailer.createTransport({
    host: "mail.skep.co.za",
    port: 26,
    secure: false,
    auth: {
      user: 'stephan@skep.co.za',
      pass: 'Test_123!'
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailOptions = {
    from: '"Nodemailer" <stephan@skep.co.za>',
    to: "sgriesel@gmail.com",
    subject: "Book swap request",
    text: "Book swap request",
    html: output
  };

  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.render('contact', {msg: 'Swap request has been sent'});
}});

  module.exports = router;