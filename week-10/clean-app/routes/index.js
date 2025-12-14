var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');

// protected route: /dashboard
router.get('/dashboard', auth, (req, res) => {
  res.send("Welcome to the dashboard 🔐");
});

// home page: /
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/error', (req, res) => {
  throw new Error("Testing error!");
});

module.exports = router;
