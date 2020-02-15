const User = require("../models/User.model");

module.exports = {

  // register a new user
  async registerUsers(req, res) {
    const { email, name, lastname, password } = req.body;
    try {
      // make a new user
      const user = new User({ email, name, lastname, password });

      await user.save();

      res.status(201).json({ success: true, userdata: user });
    } catch (error) {
      res.status(500).json({ success: false, err: error });
    }
  },

  // login a user
  async loginUser(req,res){
    try {
      
    } catch (error) {
      
    }
  }
};
