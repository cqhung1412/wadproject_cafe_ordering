const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [{
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    description: String,
    note: String,
    size: String,
    toppings: [String],
    quantity: {
      type: Number,
      get: v => Math.round(v),
      set: v => Math.round(v),
    },
    totalPrice: {
      type: Number,
      get: v => Math.round(v),
      set: v => Math.round(v),
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
      get: v => Math.round(v),
      set: v => Math.round(v),
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
      get: v => Math.round(v),
      set: v => Math.round(v),
    }
  }],
  totalCost: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
