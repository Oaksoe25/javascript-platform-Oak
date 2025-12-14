var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
console.log('✅ articlesRouter =', typeof articlesRouter);

var app = express();

/* ================= CUSTOM LOGGER ================= */
function myLogger(req, res, next) {
  console.log('MY LOGGER =>', req.method, req.url);
  next();
}
app.use(myLogger);
/* ================================================ */

/* ================= VIEW ENGINE ================= */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/* =============================================== */

/* ================= MIDDLEWARES ================= */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* =============================================== */

/* ================= ROUTES ================= */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
/* =============================================== */

/* ================= 404 HANDLER ================= */
app.use(function (req, res, next) {
  next(createError(404));
});
/* =============================================== */

/* ================= ERROR HANDLER ================= */
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});
/* =============================================== */

module.exports = app;
