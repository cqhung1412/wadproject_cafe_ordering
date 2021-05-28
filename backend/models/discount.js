const mongoose = require('mongoose');
const ttl = require('mongoose-ttl');
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
discountSchema.plugin(ttl, { ttl: '30d' });

module.exports = mongoose.model('Discount', discountSchema);
