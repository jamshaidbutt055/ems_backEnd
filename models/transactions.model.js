var Mongoose = require("mongoose");

var Schema = Mongoose.Schema;

var TransactionSchema = new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  paid_by: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  people_included: [{ type: Schema.Types.ObjectId, ref: "user" }],
  amount_paid: Number,
  created_at: Date,
  added_by: { type: Schema.Types.ObjectId, ref: "user" },
});

TransactionSchema.set("autoIndex", true);

module.exports = Mongoose.model("transactions", TransactionSchema);
