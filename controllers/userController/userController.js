const User = require("../../model/User");
const jwt = require("jsonwebtoken");

const userToken = (userId) => {
	return jwt.sign({ sub: userId }, process.env.TOKEN_SECRET);
};

exports.signin = (req, res) => {
	res.send({ token: userToken(req.user._id) });
};

exports.signup = async (req, res) => {
	try {
		console.log(req.body);
		const { name, email, password } = req.body;

		const userExist = await User.findOne({ email });

		if (userExist) {
			return res.send("User already exist");
		}

		const newUser = new User({ email, name, password });
		await newUser.save();
		res.send({ token: userToken(newUser) });
	} catch (err) {
		res.status(422).send(err);
	}
};
exports.logout = (req, res) => {
	res.send({ welcome: "log out" });
};
