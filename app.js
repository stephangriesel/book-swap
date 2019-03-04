const mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
const port = 3010;
const Book = require('./models/book');
const path = require('path')
const router = express.Router()

// Connect
mongoose.connect('mongodb://localhost/bookSwap');

// HBS
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// Middleware bodyParser logic
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Routes
// --> Default Route
const defaultRoute = require('./routes/default-route')
app.use('/', defaultRoute);

// --> Books Route
const bookRoute = require('./routes/book-route')
app.use('/', bookRoute);

// --> Auth Route
const authRoute = require('./routes/auth-route')
app.use('/', authRoute);

// --> Signup Route
const signupRoute = require('./routes/signup-route')
app.use('/', signupRoute);



// Cookie Parser
app.use(cookieParser("this-is-a-secret"));

// Clear cookies
app.get('/', function(req,res){
    res.clearCookie('this-is-a-secret');
    res.send('Cookie deleted');
  });

app.listen(port, () => console.log(`Hoor hoor, ek luister op poort: ${port}!`))
