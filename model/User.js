const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	name: { type: String, require: true, trim: true },
	email: {
		type: String,
		require: true,
		trim: true,
		unique: true,
		lowercase: true,
		validate: {
			validator: (email) => {
				return validator.isEmail(email);
			},
		},
	},
	password: { type: String, require: true, minlength: 6 },
	Blog: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	return userObject;
};

userSchema.pre("save", async function (next) {
	const user = this;

	const hashPassword = await bcrypt.hash(user.password, 10);
	user.password = hashPassword;
	return user;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
