const express = require('express');

const productController = require('../controllers/customer/product');

const Router = express.Router();

// Products
//________________________________________________________________
Router.get('/category-products', productController.getProductsByCategories);

//________________________________________________________________

module.exports = Router;
