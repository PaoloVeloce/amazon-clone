var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');


var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://root:1QaZ2WsX3EdC@ds017185.mlab.com:17185/amazonclone', function(err) {
   if (err) {
     console.log(err);
   } else {
     console.log("Connected to database");
   }
});


app.use(express.static(__dirname + '/public'));
// middleware - will log all user requests to the server
app.use(morgan('dev'));
// middleware - express app could parse json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// middleware ejs - learn node how to use ejs
app.engine('ejs', engine); // what kind of engine to use
app.set('view engine', 'ejs'); // use ejs engine


// app.post() - authentication
app.post('/create-user', function(req, res, next) {
  var user = new User();

  user.profile.nome = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save(function(err) {
    if (err) return next(err);
    res.json('Succesfully created user')
  });
});

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/about', function(req, res) {
  res.render('main/about');
})

// running simpliest server
app.listen(3000, function (err) {
  if (err) throw err;
  console.log("Server running on port 3000");
});
