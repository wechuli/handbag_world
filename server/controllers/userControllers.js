const User = require("../models/User.model");
const bcrypt = require("bcrypt");

module.exports = {
  // register a new user
  async registerUsers(req, res) {
    const { email, name, lastname, password } = req.body;
    try {
      // make a new user
      const user = new User({ email, name, lastname, password });

      await user.save();

      res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, err: error });
    }
  },

  // login a user
  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      // find email
      const user = User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          loginSuccess: false,
          message: "Auth failed wrong email/password"
        });
      }

      // check password

      //note the findByCredentials method is on the Model/Collection since it involves searching through the whole collection
      User.findByCredentials(email, password)
        .then(user => {
          user.generateAuthToken().then(token => {
            res
              .cookie("w_auth", user.token)
              .status(200)
              .json({ loginSuccess: true });
          });
        })
        .catch(err => {
          return res.status(401).json({
            loginSuccess: false,
            message: "Auth failed wrong email/password"
          });
        });

      // generate token
    } catch (error) {}
  },

  async authenticateUser(req, res) {
    const { user } = req;
    try {
      res.status(200).json({
        isAdmin: user.role !== 0,
        isAuth: true,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        cart: user.cart,
        history: user.hostory
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  async logoutUser(req, res) {
    const { user } = req;
    try {
      await User.findOneAndUpdate({ _id: user._id }, { token: "" });
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, err });
    }
  }
};
