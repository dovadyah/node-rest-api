var express = require('express');
var router = express.Router();

/* GET product listings */
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /products",
  })
});

/* POST a product into database */
router.post('/', (req, res, next) => {
  res.status(200).json({
    message: "Handling POST request to /products",
  })
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
