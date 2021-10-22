var Mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var UserModel = require("../models/authentication.model");
// var db = Mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));

// db.once("open", function () {
//   console.log("Connection Successful!");
// });

const hashText = async (dataToEncrypt) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(dataToEncrypt, salt);
};

const comparePasswordwithHash = (plainText, hashedText) => {
  return bcrypt.compare(plainText, hashedText);
};

const findUserByEmail = (email) => {
  return UserModel.find({
    email: email,
  });
};

exports.signin = async (userData) => {
  if (!(userData.email && userData.password)) {
    return {
      error: true,
      message: "Email and Password are required.",
      data: [],
    };
  }
  try {
    let foundUser = await findUserByEmail(userData.email);
    if (foundUser.length) {
      let isPasswordCorrect = await comparePasswordwithHash(
        userData.password,
        foundUser[0].password
      );
      const token = jwt.sign(
        {
          userId: foundUser[0]._id,
          name: foundUser[0].name,
          email: foundUser[0].email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return isPasswordCorrect
        ? {
            error: false,
            message: "User Logged In.",
            data: { user: foundUser[0], token: token },
          }
        : { error: true, message: "Incorrect Password.", data: [] };
    }
    return {
      error: true,
      message: "User Not Found.",
      data: [],
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "Exception.",
      data: err,
    };
  }
};

exports.signup = async (userData) => {
  if (!(userData.email && userData.password && userData.name)) {
    return {
      error: true,
      message: "Name,Email and Password are required.",
      data: [],
    };
  }
  try {
    let alreadyExistedUser = await findUserByEmail(userData.email);

    if (!alreadyExistedUser.length) {
      var user = UserModel(userData);
      user.password = await hashText(userData.password);
      return user.save().then((data) => {
        return {
          error: false,
          message: "User Saved.",
          data: data,
        };
      });
    } else {
      return {
        error: true,
        message: "User already exists.",
        data: [],
      };
    }
  } catch (err) {
    return { error: true, message: "Exception.", data: err };
  }
};
