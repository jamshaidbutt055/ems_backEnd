var express = require("express");
var router = express.Router();
var AuthenticationController = require("../controllers/authentication.controller");

router
  .post("/signin", AuthenticationController.signin)
  .post("/signup", AuthenticationController.signup);

module.exports = router;
