const express = require("express");
const { auth, checkAdmin } = require("../middleware/auth");
const {
  createNewBrand,
  getAllBrands,
  createNewBagType,
  getAllBagTypes,
  addNewProduct,
  getProductsById,
  getTopProducts
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

// add a product
router.post(
  "/article",
  auth,
  checkAdmin,
  validateBody(schemas.productSchema),
  addNewProduct
);

// get a product by id
router.get(
  "/article/byid",
  validateBody(schemas.productByIdSearchSchema),
  getProductsById
);

//sort products by arrival  /articles
//sort products by number sold

router.get("/articles", getTopProducts);

module.exports = router;
