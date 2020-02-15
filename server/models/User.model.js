const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
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


const User = model("User", userSchema);

module.exports = User;
