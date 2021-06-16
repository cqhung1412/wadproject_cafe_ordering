"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrder = void 0;

var actionTypes = _interopRequireWildcard(require("./actionTypes"));

var _axiosInstance = _interopRequireDefault(require("../../axios-instance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var onCheckoutFailed = function onCheckoutFailed(error) {
  return {
    type: actionTypes.SET_ERROR,
    error: error
  };
};

var createOrder = function createOrder() {
  return function (dispatch) {
    dispatch({
      type: actionTypes.CHECKOUT
    });
    var user = localStorage.getItem('user');
    var token = user.token,
        cart = user.cart;

    _axiosInstance["default"].post('/order', cart, {
      headers: {
        'Authorization': "Bearer ".concat(token)
      }
    }).then(function (res) {
      if (res.status === 201 || 200) dispatch({
        type: actionTypes.CHECKOUT_SUCCESS,
        payload: cart
      });
    })["catch"](function (error) {
      return dispatch(onCheckoutFailed(error));
    });
  };
};

exports.createOrder = createOrder;