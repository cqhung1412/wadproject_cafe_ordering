"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var orderSchema = new Schema({
  products: [{
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    description: String,
    unitPrice: {
      type: Number,
      get: function get(v) {
        return Math.round(v);
      },
      set: function set(v) {
        return Math.round(v);
      }
    },
    note: String,
    size: {
      name: String,
      unitPrice: {
        type: Number,
        get: function get(v) {
          return Math.round(v);
        },
        set: function set(v) {
          return Math.round(v);
        }
      }
    },
    toppings: [{
      name: String,
      unitPrice: {
        type: Number,
        get: function get(v) {
          return Math.round(v);
        },
        set: function set(v) {
          return Math.round(v);
        }
      }
    }],
    quantity: {
      type: Number,
      get: function get(v) {
        return Math.round(v);
      },
      set: function set(v) {
        return Math.round(v);
      }
    },
    totalPrice: {
      type: Number,
      get: function get(v) {
        return Math.round(v);
      },
      set: function set(v) {
        return Math.round(v);
      }
    }
  }],
  buyer: {
    accountId: {
      type: mongoose.Types.ObjectId,
      ref: 'Account'
    },
    name: String,
    phone: String
  },
  orderStatus: String,
  orderType: String,
  shippingOptions: {
    address: String,
    fee: {
      type: Number,
      get: function get(v) {
        return Math.round(v);
      },
      set: function set(v) {
        return Math.round(v);
      }
    }
  },
  inStoreOptions: {
    tableId: {
      type: mongoose.Types.ObjectId,
      ref: 'Table'
    },
    tableCode: String,
    note: String
  },
  discounts: [{
    discountId: {
      type: mongoose.Types.ObjectId,
      ref: 'Discount'
    },
    discountCode: String,
    discountOn: String,
    discountPercent: {
      type: Number,
      get: function get(v) {
        return Math.round(v);
      },
      set: function set(v) {
        return Math.round(v);
      }
    }
  }],
  totalCost: {
    type: Number,
    get: function get(v) {
      return Math.round(v);
    },
    set: function set(v) {
      return Math.round(v);
    }
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Order', orderSchema);