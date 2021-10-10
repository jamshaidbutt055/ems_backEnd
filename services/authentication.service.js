var Mongoose = require("mongoose");
var UserModel = require("../models/authentication.model");

var db = Mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

exports.signin = (userData) => {
  return UserModel.find({
    username: userData.username,
    password: userData.password,
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

exports.signup = (userData) => {
  var user = UserModel(userData);
  return user
    .save()
    .then((data) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
