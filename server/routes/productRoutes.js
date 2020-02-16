const express = require("express");
const authMiddleware = require("../middleware/auth");
const { createNewBrand } = require("../controllers/brandControllers");

const router = express.Router();

//============================================
//              BRANDS
//=============================================

// create a new brand
router.post("/brand", authMiddleware, createNewBrand);
module.exports = router;
