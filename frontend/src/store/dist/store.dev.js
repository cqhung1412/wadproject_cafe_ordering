"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = require("redux-logger");

var _auth = _interopRequireDefault(require("./reducers/auth"));

var _error = _interopRequireDefault(require("./reducers/error"));

var _product = _interopRequireDefault(require("./reducers/product"));

var _cart = _interopRequireDefault(require("./reducers/cart"));

var _order = _interopRequireDefault(require("./reducers/order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var loggerMiddleware = (0, _reduxLogger.createLogger)();
var composeEnhancers = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : _redux.compose;
var rootReducer = (0, _redux.combineReducers)({
  auth: _auth["default"],
  error: _error["default"],
  prod: _product["default"],
  cart: _cart["default"],
  order: _order["default"]
});
var store = (0, _redux.createStore)(rootReducer, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk["default"], loggerMiddleware)));
var _default = store;
exports["default"] = _default;