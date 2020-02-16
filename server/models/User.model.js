const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_I = 10;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
    required: true
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
    required: true
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

// hash the plain text passowrd before saving
userSchema.pre("save", async function(next) {
  // store this in a variable
  const user = this;

  // only hash the password if the password has been changed

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, SALT_I);
  }
  next();
});

// this is an instance method to generate token
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  // const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET, {
  //   expiresIn: "2 days"
  // });
  const token = jwt.sign(user._id.toHexString(),process.env.JWT_SECRET);

  user.token = token;
  await user.save();
  return token;
};

//define a method on the userSchema that will confirm credentials when called. This a model method
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// define a static method that will find and return a user given the token

userSchema.statics.findByToken = async function(token) {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decodedToken,
      token
    });
    if (!user) {
      throw new Error("Authentication failed");
    }
    return user;
  } catch (error) {
    throw new Error("Authentication failed");
  }
};

const User = model("User", userSchema);

module.exports = User;
