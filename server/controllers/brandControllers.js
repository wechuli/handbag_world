const Brand = require("../models/Brand.model");

module.exports = {
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
  }
};
