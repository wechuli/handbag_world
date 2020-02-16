const express = require("express");
const authMiddleware = require("../middleware/auth");

const router = express.Router();


//============================================
//              BRANDS
//=============================================

// create a new brand
router.post("/brand",authMiddleware,)
module.exports = router;
