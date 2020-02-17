const { model, Schema } = require("mongoose");

const bagTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  }
});

const BagType = model("bagtype", bagTypeSchema);

module.exports = BagType;
