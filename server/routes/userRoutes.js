const express = require("express");
const { schemas, validateBody } = require("../helpers/requestValidator");

const { registerUsers } = require("../controllers/userControllers");

const router = express.Router();


// register a new user
router.post(
  "/register",
  validateBody(schemas.userRegistrationSchema),
  registerUsers
);

// login a user

router.post("/login")

module.exports = router;
