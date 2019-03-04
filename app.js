const mongoose = require('mongoose');
var express = require('express');
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
// --> Books Route
const bookRoute = require('./routes/book-route')
app.use('/', bookRoute);

// --> Default Route
const defaultRoute = require('./routes/default-route')
app.use('/', defaultRoute);

app.listen(port, () => console.log(`Hoor hoor, ek luister op poort: ${port}!`))
