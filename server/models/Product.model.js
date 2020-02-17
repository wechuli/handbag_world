const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  brand:{
      
  }
});

const Product = model("Product", productSchema);

module.exports = Product;
