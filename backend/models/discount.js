const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountSchema = new Schema({
  code: String,
  discountOn: String,
  percent: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Discount', discountSchema);
