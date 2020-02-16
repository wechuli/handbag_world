const express = require("express");
const { schemas, validateBody } = require("../middleware/requestValidator");

const {
  registerUsers,
  loginUser,
  authenticateUser,
  logoutUser
} = require("../controllers/userControllers");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

// register a new user
router.post(
  "/register",
  validateBody(schemas.userRegistrationSchema),
  registerUsers
);

// login a user
router.post("/login", validateBody(schemas.userLogin), loginUser);

// auth route
router.get("/auth", authMiddleware, authenticateUser);

// logout user
router.get("/logout", authMiddleware, logoutUser);

module.exports = router;
