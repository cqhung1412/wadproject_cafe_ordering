"use strict";

var _require = require('../../util/error-handler'),
    errorHandler = _require.errorHandler;

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createOrder = function _callee(req, res, next) {
  var products, userId;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          products = req.body.products;
          userId = req.userId;

          try {} catch (error) {
            errorHandler(req, error, next);
          }

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getCheckout = function _callee2(req, res, next) {
  var products, line_items, stripeCheckoutSession;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          products = req.body.products;
          line_items = products.map(function (product) {
            return {
              name: product.name,
              description: product.note || 'No description!',
              amount: product.totalPrice,
              currency: 'vnd',
              quantity: product.quantity
            };
          });
          _context2.next = 4;
          return regeneratorRuntime.awrap(stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            success_url: "".concat(req.protocol, "://").concat(process.env.FRONTEND_URL, "/checkout/success"),
            cancel_url: "".concat(req.protocol, "://").concat(process.env.FRONTEND_URL, "/checkout/cancel")
          }));

        case 4:
          stripeCheckoutSession = _context2.sent;
          console.log(stripeCheckoutSession);
          res.status(200).json({
            message: 'Got sessionId :D',
            stripeCheckoutSessionId: stripeCheckoutSession.id
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};