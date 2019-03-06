const mongoose = require('mongoose');
  // mongooseHistory = require('mongoose-history'); // https://github.com/nassor/mongoose-history
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
const port = 3008;
const Book = require('./models/book');
// const History = require('./models/history');
const path = require('path');
const router = express.Router();
var hbs = require('hbs');
const session = require("express-session");
const Mongostore = require("connect-mongo")(session);

// Connect
mongoose.connect('mongodb://localhost/bookSwap', { useNewUrlParser: true });

// HBS
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname, 'public')));

// Middleware bodyParser logic
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Express sessions & Mongo Connect middleware
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60000},
  emailjaap: "jaap",
  resave: true,
  saveUninitialized: true,
  store: new Mongostore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
 }));

// Cookie Parser
app.use(cookieParser("this-is-a-secret"));

// Auth Route
const authRoute = require('./routes/auth-route')
app.use('/', authRoute);

// // Clear cookies
// const logoutRoute = require('./routes/logout-route')
// app.use('/logout', logoutRoute);

// --> Default Route
const defaultRoute = require('./routes/default-route')
app.use('/', defaultRoute);

// // --> Books Route
const bookRoute = require('./routes/book-route')
app.use('/', bookRoute);

// --> Signup Route
// const signupRoute = require('./routes/signup-route')
// app.use('/', signupRoute);

// --> Login Route
// const loginRoute = require('./routes/login-route')
// app.use('/', loginRoute);

// --> Profile Route
const profileRoute = require('./routes/profile-route')
app.use('/', profileRoute);

app.use('/auth', require('./routes/auth-route'))

app.listen(port, () => console.log(`Hoor hoor, ek luister op poort: ${port}!`))
