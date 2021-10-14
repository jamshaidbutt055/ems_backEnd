var AuthenticationService = require("../services/authentication.service");

exports.signin = async (req, res) => {
  var result = await AuthenticationService.signin(req.body);
  res.status(200).send(JSON.stringify(result));
};

exports.signup = async (req, res) => {
  var result = await AuthenticationService.signup(req.body);
  res.status(200).send(result);
};
