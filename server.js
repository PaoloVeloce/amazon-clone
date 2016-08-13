var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
// deep into logging system with session and cookie-parser
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');


var secret = require('./config/secret');
var User = require('./models/user');
var Category = require('./models/category');

var app = express();
// connecting mongo database to our server
mongoose.connect(secret.database, function(err) {
   if (err) {
     console.log(err);
   } else {
     console.log("Connected to database");
   }
});

// ???
app.use(express.static(__dirname + '/public'));
// middleware - will log all user requests to the server
app.use(morgan('dev'));
// middleware - express app could parse json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new MongoStore({ url: secret.database, autoReconnect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// every route will have user by default
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(function(req, res, next) {
  Category.find({}, function(err, categories) {
    if (err) return next(err);
    res.locals.categories = categories;
    next();
  });
});



// middleware ejs - learn node how to use ejs
app.engine('ejs', engine); // what kind of engine to use
app.set('view engine', 'ejs'); // use ejs engine

// introducing moved to routes folder routes
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
var adminRoutes = require('./routes/admin');
// middleware - say node that routes here - can be like '/paolo', mainRoutes
app.use(mainRoutes);
app.use(userRoutes);
app.use(adminRoutes);


// running simpliest server
app.listen(secret.port, function (err) {
  if (err) throw err;
  console.log("Server running on port " + secret.port);
});
