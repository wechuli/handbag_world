const { model, Schema } = require("mongoose");

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  }
});

const Brand = model("Brand", brandSchema);

module.exports = Brand;
