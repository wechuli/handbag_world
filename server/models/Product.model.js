const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
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
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true
    },
    shipping: {
      type: Boolean,
      required: true
    },
    available: {
      type: Boolean,
      required: true
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "Bagtype",
      required: true
    },
    handles: {
      type: Number,
      required: true,
      min: 0,
      max: 7
    },
    sold: {
      type: Number,
      default: 0
    },
    publish: {
      type: Boolean,
      required: true
    },
    images: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = Product;
