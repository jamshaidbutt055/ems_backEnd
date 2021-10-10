var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  username: String,
  password: String,
});

UserSchema.set("autoIndex", true);

module.exports = Mongoose.model("user", UserSchema);
