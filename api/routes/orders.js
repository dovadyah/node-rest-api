var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('../models/order-model');

/* 
 * GET orders listing. 
 */

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /orders",
  })
});


/* 
 * POST an order into database 
 */

router.post('/', (req, res, next) => {

  //create a new order 
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productId
  })

  //save new order to database
  order.save()
    .then(result => {
      //send response to user. 
      res.status(201).json({
        orderCreated: {
          _id: result._id,
          quantity: result.quantity,
          productId: result.product
        },
        viewOrder: {
          request: {
            type: 'GET',
            url: 'http://localhost:3000/orders/' + result._id
          }
        },
        updateOrder: {
          request: {
            type: 'PATCH',
            url: 'http://localhost:3000/orders/' + result._id
          },
          requestBody: {
            typeof: 'Array',
            values: {
              typeof: 'Object',
              fields: ['propName', 'value']
            }
          }
        },
        viewProduct: {
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + result.product._id
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
});


/* 
 * GET order by ID 
 */

router.get('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId;

  res.status(200).json({
    message: "Handling GET request for order with ID: " + orderId,
  })
});


/* 
 * DELETE an order from database 
 */

router.delete('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId;

  res.status(200).json({
    message: "Handling DELETE request for order with ID: " + orderId,
  })
});

module.exports = router;
