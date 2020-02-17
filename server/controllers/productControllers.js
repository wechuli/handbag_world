const Brand = require("../models/Brand.model");

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
  }
};
