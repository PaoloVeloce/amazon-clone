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


var User = require('./models/user');

var app = express();
// connecting mongo database to our server
mongoose.connect('mongodb://root:1QaZ2WsX3EdC@ds017185.mlab.com:17185/amazonclone', function(err) {
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
  secret: "Paolo!!!"
}));
app.use(flash());



// middleware ejs - learn node how to use ejs
app.engine('ejs', engine); // what kind of engine to use
app.set('view engine', 'ejs'); // use ejs engine

// introducing moved to routes folder routes
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
// middleware - say node that routes here - can be like '/paolo', mainRoutes
app.use(mainRoutes);
app.use(userRoutes);


// running simpliest server
app.listen(3000, function (err) {
  if (err) throw err;
  console.log("Server running on port 3000");
});
