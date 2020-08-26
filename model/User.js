const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	username: { type: String, require: true, trim: true, unique: true },
	bio: { type: String, require: true, trim: true },
	email: {
		type: String,
		require: true,
		trim: true,
		unique: true,
		lowercase: true,
	},
	password: { type: String, require: true, minlength: 6 },
	blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

userSchema.plugin(uniqueValidator);

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	return userObject;
};

userSchema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password")) {
		const hashPassword = await bcrypt.hash(user.password, 10);
		user.password = hashPassword;
	}

	return user;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
