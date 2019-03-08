const mongoose = require('mongoose');
// mongooseHistory = require('mongoose-history'); // https://github.com/nassor/mongoose-history
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = proces.env.PORT;
const Book = require('./models/book');
// const History = require('./models/history');
const path = require('path');
const router = express.Router();
const hbs = require('hbs');
const session = require("express-session");
const Mongostore = require("connect-mongo")(session);
const nodemailer = require('nodemailer');
require('dotenv').config();

// Connect
mongoose.connect(process.env.MONGODB_URI), { useNewUrlParser: true };

// HBS
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname, 'public')));
const cookieSession = require('client-sessions');

// Middleware bodyParser logic
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Express sessions & Mongo Connect middleware
app.use(session({
  cookieName: 'session',
  secret: `COOKIE_SECRET`,
  cookie: { maxAge: 60000 },
  secure: true,
  resave: true,
  httpOnly: true,
  ephemeral: true, // Deletes cookies when browser closed
  saveUninitialized: true,
  store: new Mongostore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

// Cookie Parser
app.use(cookieParser(`COOKIE_PARSER`));

// --> Default Route
const defaultRoute = require('./routes/default-route')
app.use('/', defaultRoute);

// // --> Books Route
const bookRoute = require('./routes/book-route')
app.use('/', bookRoute);

// --> Profile Route
const profileRoute = require('./routes/profile-route')
app.use('/', profileRoute);

// --> Auth Route
const authRoute = require('./routes/auth-route')
app.use('/', authRoute);
app.use('/auth', require('./routes/auth-route'))
app.use('/', require("./routes/site-route"))

app.listen(port, () => console.log(`Hoor hoor, ek luister op poort: ${process.env.PORT}!`))
