const express = require('express');

const router = express.Router();
const productModel = require('./product.api');

router.use('/api/product', productModel);

module.exports = router;
