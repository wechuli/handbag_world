const mongoose = require("mongoose");
const User = require("../../server/models/User.model");
const Brand = require("../../server/models/Brand.model");

// dummy user objects
const userOne = {
  email: "wechulipaul@yahoo.com",
  password: "thisisasecur8epa55w0rD",
  name: "Paul",
  lastname: "Wechuli"
};

const userTwo = {
  email: "ulemseeone@gmail.com",
  password: "thisisasecur8epa55w0rD",
  name: "Ule",
  lastname: "Msee"
};

// clear all database records
const clearAllDatabaseRecords = async () => {
  await User.deleteMany();
  await Brand.deleteMany();
};

// make valid dummy user in db

const makeSingleValidDummyUser = async () => {
  const user = new User(userTwo);
  await user.save();
};

module.exports = {
  clearAllDatabaseRecords,
  userOne,
  userTwo,
  makeSingleValidDummyUser
};
