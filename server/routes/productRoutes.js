const express = require("express");
const authMiddleware = require("../middleware/auth");
const { createNewBrand } = require("../controllers/productControllers");
const { schemas, validateBody } = require("../middleware/requestValidator");

const router = express.Router();

//============================================
//              BRANDS
//=============================================

// create a new brand
router.post(
  "/brand",
  authMiddleware,
  validateBody(schemas.brandSchema),
  createNewBrand
);

module.exports = router;
