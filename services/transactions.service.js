var Mongoose = require("mongoose");
const TransactionsModel = require("../models/transactions.model");

// var db = Mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));

// db.once("open", function () {
//   console.log("Connection Successful!");
// });

exports.createTransaction = (tData) => {
  let transaction = new TransactionsModel({
    title: tData.title,
    paid_by: Mongoose.Types.ObjectId(tData.userId),
    people_included: [],
    amount_paid: tData.amount,
    created_at: Date.now(),
    added_by: Mongoose.Types.ObjectId(tData.userId),
  });
  return transaction
    .save()
    .then((response) => {
      return {
        error: false,
        message: "Transaction Saved.",
        data: response.data,
      };
    })
    .catch((err) => {
      return {
        error: true,
        message: "Something went wrong.",
        data: err,
      };
    });
};

// exports.signup = (userData) => {
//   var user = UserModel(userData);
//   return user
//     .save()
//     .then((data) => {
//       return true;
//     })
//     .catch((err) => {
//       console.log(err);
//       return false;
//     });
// };
