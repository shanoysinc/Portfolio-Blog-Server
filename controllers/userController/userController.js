const User = require("../../model/User");
const jwt = require("jsonwebtoken");

const userToken = (userId) => {
	return jwt.sign({ sub: userId }, process.env.TOKEN_SECRET);
};

exports.userprofile = async (req, res) => {
	try {
		const { username } = req.params;
		const blog = await User.findOne({ username }).populate("blogs").exec();

		if (!blog) {
			return res.status(404).send();
		}
		res.send(blog);
	} catch (err) {
		res.status(404).send(err);
	}
};

exports.signin = (req, res) => {
	res.send({ token: userToken(req.user._id), user: req.user.username });
};

exports.signup = async (req, res) => {
	try {
		const { username, email, password, bio, name } = req.body;

		const newUser = new User({ email, username, password, bio, name });
		await newUser.save();
		res.send({ token: userToken(newUser._id), user: username });
	} catch (err) {
		res.status(422).send(err);
	}
};
// exports.signout = (req, res) => {
// 	res.send("");
// };
