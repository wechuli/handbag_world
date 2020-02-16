const User = require("../models/User.model");

async function auth(req, res, next) {
  let token = req.cookies.w_auth;

  User.findByToken()

}

module.exports = auth;
