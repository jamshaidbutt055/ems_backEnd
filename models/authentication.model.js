var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var UserSchema = new Schema({
  id: Number,
  username: String,
  password: String,
});

UserSchema.set("autoIndex", true);

module.exports = Mongoose.model("user", UserSchema);
