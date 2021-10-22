var express = require("express");
var auth = require("../middlewares/auth.middleware");
var router = express.Router();
var AuthenticationController = require("../controllers/authentication.controller");
var TransactionController = require("../controllers/transactions.controller");
router
  .post("/signin", AuthenticationController.signin)
  .post("/signup", AuthenticationController.signup)
  .post("/transactions/add", auth, TransactionController.addTransaction);

module.exports = router;
