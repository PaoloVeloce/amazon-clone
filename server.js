var express = require('express');
var morgan = require('morgan');

var app = express();

// middleware - will log all user requests to the server
app.use(morgan('dev'));


// req = requesting something from the server
// res = responding with something like webpage
app.get('/', function (req, res) {
  var name = "Paolo";
  res.json("My name is " + name);

});

app.get('/catname', function (req, res) {
  res.json('papaolo');
})
// sending some data to server, validate and response
// app.post();

// running simpliest server
app.listen(3000, function (err) {
  if (err) throw err;
  console.log("Server running on port 3000");
});
