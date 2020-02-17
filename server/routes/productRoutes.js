const express = require("express");
const { auth, checkAdmin } = require("../middleware/auth");
const {
  createNewBrand,
  getAllBrands
} = require("../controllers/productControllers");
const { schemas, validateBody } = require("../middleware/requestValidator");

const router = express.Router();

//============================================
//              BRANDS
//=============================================

// create a new brand
router.post(
  "/brand",
  auth,
  checkAdmin,
  validateBody(schemas.brandSchema),
  createNewBrand
);

// get all brands

router.get("/brand", getAllBrands);

module.exports = router;
