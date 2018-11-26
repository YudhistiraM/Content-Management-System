var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/data', function(req, res, next) {
  res.render('data');
});

router.get('/bar', function(req, res, next) {
  res.render('bar');
});

router.get('/pie', function(req, res, next) {
  res.render('pie');
});

router.get('/datadate', function(req, res, next) {
  res.render('datadate');
});

router.get('/line', function(req, res, next) {
  res.render('line');
});

router.get('/maps', function(req, res, next) {
  res.render('maps');
});

router.get('/mapsview', function(req, res, next) {
  res.render('mapsview');
});


module.exports = router;
