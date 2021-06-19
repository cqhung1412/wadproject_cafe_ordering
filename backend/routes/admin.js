const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../util/is-auth');

const accController = require('../controllers/admin/account');
const discountController = require('../controllers/admin/discount');
const orderController = require('../controllers/admin/order');
const productController = require('../controllers/admin/product');
const tableController = require('../controllers/admin/table');

const {
  getOrdersGroupByStatus,
  updateOrderCompleted
} = orderController;
const {
  getAccounts,
  createAdminAccount
} = accController;
const {
  getDiscount,
  getDiscounts,
  createDiscount,
  deleteDiscount
} = discountController;
const {
  getProduct,
  getProducts,
  getProductsByCategories,
  createProduct,
  updateProduct,
  deleteProduct
} = productController;
const {
  getTable,
  getTables,
  createTable,
  deleteTable
} = tableController;

const Account = require('../models/account');

const Router = express.Router();

// Orders
//________________________________________________________________
// GET /admin/orders
Router.get('/orders', isAuth, getOrdersGroupByStatus);

Router.put('/order-completed/:orderId', updateOrderCompleted);
//________________________________________________________________

// Products
//________________________________________________________________
// GET /admin/products
Router.get('/products', isAuth, getProductsByCategories);

// GET /admin/product/:productId
Router.get('/product/:productId', isAuth, getProduct);

// POST /admin/product
Router.post('/product',
  [
    body('name').trim()
      .isLength({ min: 5 }),
    body('unitPrice')
      .isNumeric(),
    body('isMustTry')
      .isBoolean(),
    body('category').trim()
      .isLength({ min: 2 })
      .not().isEmpty(),
    body('desc').trim()
      .isLength({ min: 5 }),
    body('sizes')
      .isArray({ min: 0, max: 3 }),
    body('toppings')
      .isArray({ min: 0 })
  ],
  /*isAuth,*/
  createProduct
);

// PUT /admin/product/:productId
Router.put('/product/:productId',
  [
    body('name').trim()
      .isLength({ min: 5 }),
    body('price')
      .isNumeric(),
    body('isMustTry')
      .isBoolean(),
    body('desc').trim()
      .isLength({ min: 5 }),
    body('sizes')
      .isArray({ min: 0, max: 3 }),
    body('toppings')
      .isArray({ min: 0 })
  ],
  isAuth,
  updateProduct
);

// DELETE /admin/product/:productId
Router.delete('/product/:productId', isAuth, deleteProduct);
//________________________________________________________________

// Tables
//________________________________________________________________
// GET /admin/tables
Router.get('/tables', isAuth, getTables);

// GET /admin/table/:tableId
Router.get('/table/:tableId', isAuth, getTable);

// POST /admin/table
Router.post('/table',
  [
    body('code').trim()
      .isAlphanumeric()
      .isLength({ min: 5 }),
    body('desc').trim()
      .isLength({ min: 5, max: 50 })
  ],
  isAuth,
  createTable
);

// DELETE /admin/table/:tabldId
Router.delete('/table/:tableId', isAuth, deleteTable);
//________________________________________________________________

// Discounts
//________________________________________________________________
// GET /admin/discounts
Router.get('/discounts', isAuth, getDiscounts)

// GET /admin/discount/:discountId
Router.get('/discount/:discountId', isAuth, getDiscount);

// POST /admin/discount
Router.post('/discount',
  [
    body('code').trim()
      .isAlphanumeric()
      .isLength({ min: 5 }),
    body('on').trim(),
    body('percent')
      .isNumeric()
  ],
  isAuth,
  createDiscount
);

// DELETE /admin/discount/:discountId
Router.delete('/discount/:discountId', isAuth, deleteDiscount);
//________________________________________________________________

// Admin accounts
//________________________________________________________________
// GET /admin/accounts
Router.get('/accounts', isAuth, getAccounts);

// POST /admin/account
Router.post('/account',
  [
    body('email')
      .isEmail()
      .withMessage('Pls enter valid email D:')
      .custom((value, { req }) => {
        return Account.findOne({ email: value }).then(accDoc =>
          accDoc && Promise.reject('Email already existed D:')
        );
      })
      .normalizeEmail(),
    body('password').trim()
      .isLength({ min: 5 }),
    body('confirmPassword').trim()
      .isLength({ min: 5 })
      .custom(async (confirmPassword, { req }) => {
        const password = req.body.password;
        if (password !== confirmPassword)
          throw new Error('Confirm password is wrong D:');
      }),
    body('firstName').trim()
      .not().isEmpty(),
    body('lastName').trim()
      .not().isEmpty(),
  ],
  createAdminAccount
);
//________________________________________________________________

module.exports = Router;
