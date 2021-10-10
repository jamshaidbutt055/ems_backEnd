var AuthenticationService = require("../services/authentication.service");

exports.signin = async (req, res) => {
  var result = await AuthenticationService.signin(req.body);
  !result.length
    ? res.status(404).send("User not found.")
    : res.status(200).send(JSON.stringify(result));
};

exports.signup = async (req, res) => {
  var result = await AuthenticationService.signup(req.body);
  result
    ? res.status(201).send("user saved")
    : res.status(500).send("Cannot Create.");
};
