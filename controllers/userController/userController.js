const User = require("../../model/User");
const jwt = require("jsonwebtoken");
exports.signin = (req, res) => {
	res.send({ welcome: "sign in" });
};

exports.signup = async (req, res) => {
	try {
		console.log(req.body);
		const { name, email, password } = req.body;

		const userExist = await User({ email });

		if (!userExist) {
			return res.send("User already exist");
		}

		const newUser = new User({ email, name, password });
		await newUser.save();
		res.send(newUser);
	} catch (err) {
		res.status(422).send(err);
	}
};
exports.logout = (req, res) => {
	res.send({ welcome: "log out" });
};
