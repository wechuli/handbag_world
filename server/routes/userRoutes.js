const express = require("express");
const {} = require('')
const { registerUsers } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerUsers);

module.exports = router;
