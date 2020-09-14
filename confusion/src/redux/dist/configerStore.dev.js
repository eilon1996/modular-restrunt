"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigureStore = void 0;

var _redux = require("redux");

var _dishes = require("./dishes");

var _comments = require("./comments");

var _promotions = require("./promotions");

var _leaders = require("./leaders");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _reactReduxForm = require("react-redux-form");

var _forms = require("./forms");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ConfigureStore = function ConfigureStore() {
  var store = (0, _redux.createStore)((0, _redux.combineReducers)(_objectSpread({
    dishes: _dishes.Dishes,
    comments: _comments.Comments,
    promotions: _promotions.Promotions,
    leaders: _leaders.Leaders
  }, (0, _reactReduxForm.createForms)({
    feedback: _forms.InitialFeedback
  }))), (0, _redux.applyMiddleware)(_reduxThunk["default"], _reduxLogger["default"]));
  return store;
};

exports.ConfigureStore = ConfigureStore;