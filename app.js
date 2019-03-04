const mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
const port = 3010;
const Book = require('./models/book');
const path = require('path');
const router = express.Router();
var hbs = require('hbs');

// Connect
mongoose.connect('mongodb://localhost/bookSwap');

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

// Cookie Parser
app.use(cookieParser("this-is-a-secret"));

// // Clear cookies
const logoutRoute = require('./routes/logout-route')
app.use('/logout', logoutRoute);

// --> Default Route
const defaultRoute = require('./routes/default-route')
app.use('/', defaultRoute);

// --> Books Route
const bookRoute = require('./routes/book-route')
app.use('/', bookRoute);

// --> Signup Route
const signupRoute = require('./routes/signup-route')
app.use('/', signupRoute);

// --> Login Route
const loginRoute = require('./routes/login-route')
app.use('/', loginRoute);

// --> Profile Route
const profileRoute = require('./routes/profile-route')
app.use('/', profileRoute);

// --> Logout Route


app.listen(port, () => console.log(`Hoor hoor, ek luister op poort: ${port}!`))
