var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  category: {type: String, required: true, maxlength: 50},
  name: {type: String, required: true, maxlength: 50},
  price: {type: Number, required: true, maxlength: 6},
  stock: {type: Number, required: true},
  manufacturer: {type: String, required: true, maxlength: 50},
  ssd: {type: String, maxlength: 10},
  ram: {type: String, maxlength: 10},
  screen_size: {type: String, maxlength: 10}

})

ItemSchema.virtual('url').get(function() {
  return '/item/' + this._id;
})

ItemSchema.virtual('price_formatted').get(function() {
  return (this.price/100).toFixed(2);
})

module.exports = mongoose.model('Item', ItemSchema);