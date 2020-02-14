const User = require("../models/User.model");

module.exports = {
  async registerUsers(req, res) {
    const { email, name, lastname, password } = req.body;
    try {
      // make a new user
      const user = new User({ email, name, lastname, password });

      await user.save();

      res.status(200).json({ success: true, userdata: user });
    } catch (error) {
      res.status(500).json({ success: false, err: error });
    }
  }
};
