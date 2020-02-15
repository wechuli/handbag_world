const mongoose = require("mongoose");
const User = require("../../server/models/User.model");

const userOne = {
  email: "wechulipaul@yahoo.com",
  password: "thisisasecur8epa55w0rD",
  name: "Paul",
  lastname: "Wechuli"
};

const clearAllDatabaseRecords = async () => {
  await User.deleteMany();


};

module.exports = {
  clearAllDatabaseRecords,
  userOne
};
