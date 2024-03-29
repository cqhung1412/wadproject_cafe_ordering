"use strict";

var express = require('express');

var isAuth = require('../util/is-auth');

var profileController = require('../controllers/customer/profile');

var productController = require('../controllers/customer/product');

var orderController = require('../controllers/customer/order');

var Router = express.Router(); // Profile
//________________________________________________________________

Router.post('/shipping-address', isAuth, profileController.addShippingAddress); //________________________________________________________________
// Products
//________________________________________________________________

Router.get('/category-products', productController.getProductsByCategories); //________________________________________________________________
// Orders
//________________________________________________________________

Router.post('/checkout', isAuth, orderController.getCheckout);
Router.post('/order', isAuth, orderController.createOrder);
Router.get('/orders', isAuth, orderController.getOrders); //________________________________________________________________

module.exports = Router;