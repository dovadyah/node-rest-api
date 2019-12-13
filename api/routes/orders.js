var express = require('express');
var router = express.Router();

/* GET orders listing. */
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /orders",
  })
});

/* POST an order into database */
router.post('/', (req, res, next) => {
  res.status(201).json({
    message: "Handling POST request to /orders",
    name: req.body.name,
    lastname: req.body.lastname
  })
});

/* GET order by ID */
router.get('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId;

  res.status(200).json({
    message: "Handling GET request for order with ID: " + orderId,
  })
});

/* DELETE an order from database */
router.delete('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId;

  res.status(200).json({
    message: "Handling DELETE request for order with ID: " + orderId,
  })
});

module.exports = router;
