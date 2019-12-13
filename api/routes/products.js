const express = require('express');
const router = express.Router();
const Product = require('../models/product-model');
const mongoose = require('mongoose');

/* GET product listings */
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /products",
  })
});

/* POST a product into database */
router.post('/', (req, res, next) => {

  //set up a product with user input
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  //saves and returns a promise hwich prints out result, if not it catches an error. 
  product.save()
  .then(result => console.log(result))
  .catch(err => console.log(err)); 

  res.status(201).json({
    message: "Handling POST request to /products",
    createdProduct: product
  });
});

/* GET product by ID */
router.get('/:productId', (req, res, next) => {
  const productId = req.params.productId;

  
res.status(200).json({
    message: "Handling GET request for product with ID: " + productId,
  })
});

/* PATCH/UPDATE a product from database */
router.patch('/:productId', (req, res, next) => {
  const productId = req.params.productId;

  
res.status(200).json({
    message: "Handling PATCH request for product with ID: " + productId,
  })
});

/* DELETE a product from database */
router.delete('/:productId', (req, res, next) => {
  const productId = req.params.productId;

  
res.status(200).json({
    message: "Handling DELETE request for product with ID: " + productId,
  })
});

module.exports = router;
