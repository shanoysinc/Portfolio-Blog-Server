const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: { type: String, require: true, trim: true },
	email: {
		type: String,
		require: true,
		trim: true,
		unique: true,
		lowercase: true,
	},
	password: { type: String, require: true, minlength: 6 },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
