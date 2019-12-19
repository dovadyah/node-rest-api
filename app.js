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

//DB options for mongoose connection
var dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//set up connection to MongoDB Atlas 
mongoose.connect(process.env.MongoDBAtlasURI, dbOptions)
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
