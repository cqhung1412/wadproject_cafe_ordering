"use strict";

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getCheckout = function _callee(req, res, next) {
  var products, line_items, stripeCheckoutSession;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
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
          _context.next = 4;
          return regeneratorRuntime.awrap(stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            success_url: "".concat(req.protocol, "://").concat(process.env.FRONTEND_URL, "/checkout/success"),
            cancel_url: "".concat(req.protocol, "://").concat(process.env.FRONTEND_URL, "/checkout/cancel")
          }));

        case 4:
          stripeCheckoutSession = _context.sent;
          console.log(stripeCheckoutSession);
          res.status(200).json({
            message: 'Got sessionId :D',
            stripeCheckoutSessionId: stripeCheckoutSession.id
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};