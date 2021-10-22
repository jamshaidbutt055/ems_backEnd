const TransactionService = require("../services/transactions.service");

exports.addTransaction = async (req, res) => {
  const result = await TransactionService.createTransaction(req.body);
  res.status(200).send(result);
};
