const Brand = require("../models/Brand.model");
const BagType = require("../models/BagType.model");
const Product = require("../models/Product.model");

module.exports = {
  // create a new brand
  async createNewBrand(req, res) {
    const { name } = req.body;
    try {
      const brand = new Brand({ name });
      await brand.save();
      res.status(200).json({
        success: true,
        brand
      });
    } catch (error) {
      res.status(500).json({ success: false, err: error });
    }
  },

  // find and return all brands

  async getAllBrands(req, res) {
    try {
      const brands = await Brand.find({});
      res.status(200).json({ brands });
    } catch (error) {
      res.status(500).json({ success: false, err: error });
    }
  },

  // create a new bag types
  async createNewBagType(req, res) {
    const { name } = req.body;
    try {
      const bagType = new BagType({ name });
      await bagType.save();
      res.status(200).json({
        success: true,
        bagType
      });
    } catch (error) {
      res.status(500).json({ success: false, err: error });
    }
  },

  // find and return all bag types

  async getAllBagTypes(req, res) {
    try {
      const bagTypes = await BagType.find({});
      res.status(200).json({ bagTypes });
    } catch (error) {
      res.status(500).json({ success: false, err: error });
    }
  },

  // Add new product
  async addNewProduct(req, res) {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json({ success: true, article: product });
    } catch (error) {
      res.status(500).json({ success: false, err: error });
    }
  }
};
