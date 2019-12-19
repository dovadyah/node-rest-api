const express = require('express');
const router = express.Router();
const Product = require('../models/product-model');
const mongoose = require('mongoose');

/* 
 *  GET product listings 
 */

router.get('/', (req, res, next) => {
  Product.find()
  .select('item price _id') 
  .exec()
  .then(product => {
    const responseObj = {
      count: product.length,
      products:  product.map(prdct => {
        return {
          item: prdct.item, 
          price: prdct.price,
          _id: prdct._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + prdct._id
          }
        }
      })
    }
    res.status(200).json(responseObj);
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
    res.status(201).json({
      createdProduct: {
        item: result.item, 
        price: result.price,
        _id: result._id,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + result._id
        }
      }
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
  .select('item price _id')
  .exec()
  .then(product => {
    if(product){
      res.status(200).json({
        product: product,
        toUpdate: {
          request: {
            type: "PATCH",
            url: 'http://localhost:3000/products/' + product._id
          },
          data: {
            typeof: 'array',
            values: {
              object: {
                propName: "property to update",
                value: "value use for update"
              }
            }
          }
        }
      });                           //send response
    } else{
      res.status(404).json({
        message: "Sorry, We couldn't find a product by that ID."
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

  //need to send a json array objects containing a propName and value for each field to update.
  for(const ops of req.body) updateOps[ops.propName] = ops.value;

  Product.update( { _id: req.params.productId}, { $set: updateOps })
  .exec()
  .then(product => {
    res.status(200).json({
      fieldsUpdated: updateOps,
      updatedProduct: {
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + req.params.productId
        }
      }
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
