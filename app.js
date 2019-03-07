const mongoose = require('mongoose');
// mongooseHistory = require('mongoose-history'); // https://github.com/nassor/mongoose-history
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 3008;
const Book = require('./models/book');
// const History = require('./models/history');
const path = require('path');
const router = express.Router();
const hbs = require('hbs');
const session = require("express-session");
const Mongostore = require("connect-mongo")(session);


// Connect
mongoose.connect('mongodb://localhost/bookSwap', { useNewUrlParser: true });

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
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
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
app.use(cookieParser("this-is-a-secret"));

// --> Node mailer
const nodeMailerRoute = require('./routes/nodemailer-route')
app.use('/', nodeMailerRoute);

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

app.listen(port, () => console.log(`Hoor hoor, ek luister op poort: ${port}!`))
