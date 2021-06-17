const express = require('express');
const isAuth = require('../util/is-auth');

const profileController = require('../controllers/customer/profile');
const productController = require('../controllers/customer/product');
const orderController = require('../controllers/customer/order');

const Router = express.Router();

// Profile
//________________________________________________________________
Router.post('/shipping-address', isAuth, profileController.addShippingAddress);

//________________________________________________________________

// Products
//________________________________________________________________
Router.get('/category-products', productController.getProductsByCategories);

//________________________________________________________________


// Orders
//________________________________________________________________
Router.post('/checkout', isAuth, orderController.getCheckout);

Router.post('/order', isAuth, orderController.createOrder);

Router.get('/orders', isAuth, orderController.getOrders);
//________________________________________________________________


module.exports = Router;
