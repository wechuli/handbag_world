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
  //this user is an admin
  email: "ulemseeone@gmail.com",
  password: "thisisasecur8epa55w0rD",
  name: "Ule",
  lastname: "Msee",
  role: 1
};

const userThree = {
  //this user is a normal user
  email: "adummyemail@gmail.com",
  password: "passwordsarehard",
  name: "First",
  lastname: "Nameless",
  role: 0
};

// dummy brands

const handbagBrands = [
  "Yallo Leather",
  "Coach Factory",
  "Kate Spade New York",
  "Wechuli Basket"
];

// clear all database records
const clearAllDatabaseRecords = async () => {
  await User.deleteMany();
  await Brand.deleteMany();
};

// make valid dummy user in db

const makeDummyUsers = async () => {
  const adminUser = new User(userTwo);
  const normalUser = new User(userThree);
  await normalUser.save();
  await adminUser.save();
  // await User.insertMany[(userTwo, userThree)];
};

module.exports = {
  clearAllDatabaseRecords,
  userOne,
  userTwo,
  userThree,
  makeDummyUsers,
  handbagBrands
};
