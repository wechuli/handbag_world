const User = require("../models/User.model");

async function auth(req, res, next) {
  try {
    let token = req.cookies.w_auth;
    // if there is no token provided, we can end the request without making a call to the database
    if (!token) {
      return res.status(401).json({ isAuth: false, error: true });
    }
    const user = await User.findByToken(token);
    req["token"] = token;
    req["user"] = user;
    next();
  } catch (error) {
    res.status(401).json({ isAuth: false, error: true });
  }
}

function checkAdmin(req, res, next) {
  if (req.user.role === 0) {
    return res
      .status(401)
      .json({ success: false, message: "Action not allowed" });
  }
  next();
}

module.exports = {
  auth,
  checkAdmin
};
