const express = require('express');
const router = express.Router();
const Product = require('../models/product-model');
const mongoose = require('mongoose');

/* 
 *  GET product listings 
 */

router.get('/', (req, res, next) => {
  Product.find()
  .exec()
  .then(products => {
    if(products.length === 0){
      res.status(404).json({
        message: "Sorry, We couldn't find any products. This database is empty."
      });
    } else{
      res.status(200).json(products);
    }
  })
  .catch(err => {
    res.status(500).json({
      error: err,
    });
  })
});

/* 
 *  POST a product into database 
 */

router.post('/', (req, res, next) => {
  const product = new Product({               //set up a product with user input
    _id: new mongoose.Types.ObjectId(),
    item: req.body.item,
    price: req.body.price
  });

  product.save()                              //saves and returns a promise hwich prints out result, if not it catches an error.
  .then(result => {
    console.log(result)
    res.status(201).json({
      message: "Product Successfully Created",
      createdProduct: product
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({                        //send error
      message: "We've encounter a problem :(",
      error: err
    });
  }); 
});

/* 
 *   GET product by ID 
 */

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)                      //Find product by utilizing ID from parameters
  .exec()
  .then(product => {
    console.log("Found The Following Product:\n", product);   //Log the response 
    if(product){
      res.status(200).json(product);                           //send response
    } else{
      res.status(404).json({
        message: "Sorry, We couldn't find a product by that id."
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "We've encounter a problem :(",
      error: err
    });
  });
});

/* 
 *  PATCH/UPDATE a product from database 
 */

router.patch('/:productId', (req, res, next) => {
  const updateOps = {};

  for(const ops of req.body) updateOps[ops.propName] = ops.value;

  Product.update( { _id: req.params.productId}, { $set: updateOps })
  .exec()
  .then(product => {
    res.status(200).json({
      message: "Product Updated",
      update: product
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "We've encounter a problem",
      error: err
    });
  });
});

/* 
 *  DELETE a product from database 
 */

router.delete('/:productId', (req, res, next) => {
  Product.remove({ _id: req.params.productId})
  .exec()
  .then((result) => {
    res.status(200).json({
      message: "Successfully deleted",
      results: result
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "Sorry, we've encouter a problem",
      error: err
    });
  });
});

module.exports = router;
