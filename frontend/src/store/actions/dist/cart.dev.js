"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeProductFromCart = exports.addProductToCart = void 0;

var actionTypes = _interopRequireWildcard(require("./actionTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addProductToCart = function addProductToCart(product) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.ADD_PRODUCT_TO_CART
    });
    var storedUser = JSON.parse(localStorage.getItem('user'));
    var userCart = storedUser.cart;
    var description = product.size;
    var toppingDesc = product.toppings ? product.toppings.length !== 0 ? ' +' + product.toppings.join(' +') : '' : '';
    var noteDesc = product.note ? " (".concat(product.note, ")") : '';
    description = description + toppingDesc + noteDesc;

    var prodWithDesc = _objectSpread({}, product, {
      description: description
    });

    userCart.push(prodWithDesc);
    storedUser.cart = userCart;
    localStorage.setItem('user', JSON.stringify(storedUser));
    dispatch({
      type: actionTypes.ADD_TO_CART_SUCCESS,
      payload: {
        addedProduct: prodWithDesc
      }
    });
  };
};

exports.addProductToCart = addProductToCart;

var removeProductFromCart = function removeProductFromCart(prodIndex) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.REMOVE_PRODUCT_FROM_CART
    });
    var storedUser = JSON.parse(localStorage.getItem('user'));
    var userCart = storedUser.cart;
    userCart.splice(prodIndex, 1);
    storedUser.cart = userCart;
    localStorage.setItem('user', JSON.stringify(storedUser));
    dispatch({
      type: actionTypes.REMOVE_FROM_CART_SUCCESS,
      payload: {
        productIndex: prodIndex
      }
    });
  };
};

exports.removeProductFromCart = removeProductFromCart;