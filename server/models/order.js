var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');
var User = require('./user');

var OrderSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  products: [{
    item: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantityBought: {type: Number, required: true, min: 1}
  }],
  dateOfOrder: {type: String, default: new Date().toLocaleDateString()},
  pickedUp: {type: Boolean, default: false},
  readyForPickup: {type: Boolean, default: false}
});

module.exports = mongoose.model('Orders', OrderSchema)
