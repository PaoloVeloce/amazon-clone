var router = require('express').Router();
var User = require('../models/user');

router.get('/', function(req, res) {
  res.render('main/home');
});

router.get('/about', function(req, res) {
  res.render('main/about');
});
// :id once, rather then /products/books_id etc
router.get('/products/:id', function(req, res, next) {
  Product
    .find({ category: req.params.id }) // if get('products/123' so here will be ({category: 123}))
    .populate('category')
    .exec(function(err, products) {
      if (err) return next(err);
      res.render('main/category', {
        products: products
      })
    })
})

/*
router.get('/users', function(req, res) {
  User.find({}, function (err, users) {
    res.json(users);
  });
});
*/


module.exports = router;
