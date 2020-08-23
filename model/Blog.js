const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const blogSchema = new mongoose.Schema(
	{
		title: { type: String, require: true, trim: true },
		body: {
			type: String,
			require: true,
			trim: true,
		},

		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
