const express = require('express');
const router = express.Router();
const productsController = require('../controller/productsController');

module.exports = router;

router.post('/product',productsController.addProduct);
router.get('/products',productsController.getAllProducts);
router.get('/product/:id',productsController.getProduct);
router.put('/product/:id',productsController.editProduct);
router.delete('/product/:id',productsController.deleteProduct);