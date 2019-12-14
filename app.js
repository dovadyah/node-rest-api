var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var productsRouter = require('./api/routes/products');
var ordersRouter = require('./api/routes/orders');
var corsHandler = require('./api/handlers/cors-handler');
var errorHandler = require('./api/handlers/error-handler');

var app = express();

//set up connection to MongoDB Atlas 
//Do no use URLparser or Topology options because it will not work, this will show a deprecation message but will connect. 
mongoose.connect(process.env.MongoDBAtlasURI)
.then(() => console.log("Mongodb connected"))
.catch(err => console.log(err)); 

// middleware libraries
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(corsHandler);

//middleware routes
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use(errorHandler);

module.exports = app;
