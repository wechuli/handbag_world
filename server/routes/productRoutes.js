const express = require("express");
const { auth, checkAdmin } = require("../middleware/auth");
const {
  createNewBrand,
  getAllBrands,
  createNewBagType,
  getAllBagTypes
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

//============================================
//              BAG TYPE
//=============================================

// create a new bagtype
router.post(
  "/bagtype",
  auth,
  checkAdmin,
  validateBody(schemas.brandSchema),
  createNewBagType
);

// get all brands
router.get("/bagtype", getAllBagTypes);


//============================================
//              PRODUCTS
//=============================================



module.exports = router;
