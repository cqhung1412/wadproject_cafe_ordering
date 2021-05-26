const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  unitPrice: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    required: true
  },
  category: {
    type: String,
    required: true
  },
  desc: String,
  isMustTry: Boolean,
  sizes: [{
    size: String,
    additionalPrice: {
      type: Number,
      get: v => Math.round(v),
      set: v => Math.round(v),
    }
  }],
  toppings: [{
    name: String,
    additionalPrice: {
      type: Number,
      get: v => Math.round(v),
      set: v => Math.round(v),
    }
  }]
});

module.exports = mongoose.model('Product', productSchema);
