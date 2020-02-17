function checkAdmin(req, res, res) {
  if (req.user.role === 0) {
    return res
      .status(401)
      .json({ success: false, message: "Action not allowed" });
  }
  next();
}

module.exports = checkAdmin;
