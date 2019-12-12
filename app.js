var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');

var app = express();


// middleware libraries
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//middleware routes
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) =>{
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: res.locals.message + " " + err.status
  });
});

module.exports = app;
