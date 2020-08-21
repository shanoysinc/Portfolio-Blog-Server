exports.signin = (req, res) => {
	res.send({ welcome: "sign in" });
};

exports.signup = (req, res) => {
	res.send({ welcome: "sign up" });
};
exports.logout = (req, res) => {
	res.send({ welcome: "log out" });
};
