"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processToPayment = void 0;

var _stripeJs = require("@stripe/stripe-js");

var stripePromise = (0, _stripeJs.loadStripe)(process.env.REACT_APP_STRIPE_KEY || 'pk_test_51IuK3NFc28cnctTXfVMFNQPak8N8qAMPwT3aauqo7FmfZHaq9rFXh5StcwwGwZUmmEKGFDY2PtXVV3D5QW9HYArL00yMy0ML14');

var processToPayment = function processToPayment(sessionId) {
  stripePromise.then(function (stripe) {
    return stripe.redirectToCheckout({
      sessionId: sessionId
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.processToPayment = processToPayment;