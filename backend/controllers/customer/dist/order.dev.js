"use strict";

var Account = require('../../models/account');

var Order = require('../../models/order');

var _require = require('../../util/error-handler'),
    errorHandler = _require.errorHandler,
    createError = _require.createError;

var constants = require('../../util/constants');

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getOrders = function _callee(req, res, next) {
  var userId, user, orders;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = req.userId;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Account.findById(userId));

        case 4:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          throw createError('User not found!', 404);

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(Order.find({
            'buyer.accountId': user._id
          }));

        case 9:
          orders = _context.sent;

          if (orders) {
            _context.next = 12;
            break;
          }

          throw createError('Orders not found!', 404);

        case 12:
          res.status(200).json({
            message: orders.length === 0 ? 'There is no order D:' : 'Fetched orders :D',
            orders: orders
          });
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          errorHandler(req, _context.t0, next);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

exports.createOrder = function _callee2(req, res, next) {
  var products, userId, user, totalCost, order;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          products = req.body.products;
          userId = req.userId;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Account.findById(userId));

        case 5:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          throw createError('User not found!', 404);

        case 8:
          totalCost = 0;
          products.forEach(function (p) {
            return totalCost = parseInt(totalCost + p.totalPrice);
          });
          order = new Order({
            products: products,
            buyer: {
              accountId: user._id,
              name: user.name,
              phone: user.phone || ''
            },
            orderStatus: constants.ORDER_STATUSES.PENDING,
            orderType: constants.ORDER_TYPES.IN_STORE,
            shippingOptions: null,
            inStoreOptions: null,
            discounts: [],
            totalCost: totalCost
          });
          _context2.next = 13;
          return regeneratorRuntime.awrap(order.save());

        case 13:
          res.status(201).json({
            message: 'Order is await pending by admin :D',
            order: order
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](2);
          errorHandler(req, _context2.t0, next);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 16]]);
};

exports.getCheckout = function _callee3(req, res, next) {
  var products, line_items, stripeCheckoutSession;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          products = req.body.products;
          line_items = products.map(function (product) {
            var description = product.size;
            var toppingDesc = product.toppings ? product.toppings.length !== 0 ? ' +' + product.toppings.join(' +') : '' : '';
            var noteDesc = product.note ? "(".concat(product.note, ")") : '';
            description = description + ' ' + toppingDesc + ' ' + noteDesc;
            return {
              name: product.name,
              description: description,
              amount: parseInt(product.totalPrice / product.quantity),
              currency: 'vnd',
              quantity: product.quantity
            };
          });
          _context3.next = 4;
          return regeneratorRuntime.awrap(stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            success_url: "".concat(req.protocol, "://").concat(process.env.FRONTEND_URL, "/checkout/success"),
            cancel_url: "".concat(req.protocol, "://").concat(process.env.FRONTEND_URL, "/checkout/cancel")
          }));

        case 4:
          stripeCheckoutSession = _context3.sent;
          res.status(200).json({
            message: 'Got sessionId :D',
            stripeCheckoutSessionId: stripeCheckoutSession.id
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};