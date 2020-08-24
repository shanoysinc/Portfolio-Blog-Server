const Blog = require("../../model/Blog");
const User = require("../../model/User");
const mongoose = require("mongoose");

exports.createBlog = async (req, res) => {
	try {
		const { title, body } = req.body;
		const blog = new Blog({ title, body, author: req.user._id });

		await blog.save();
		req.user.blogs.push(blog._id);

		await req.user.save();

		res.send(blog);
	} catch (err) {
		res.send(err);
	}
};

exports.getBlogs = async (req, res) => {
	try {
		const blog = await User.findOne({ _id: req.user._id })
			.populate("blogs")
			.exec();
		res.send(blog);
	} catch (err) {
		res.send(err);
	}
};

exports.updateBlog = async (req, res) => {
	try {
		const blogId = req.params.id;
		const { title, body } = req.body;
		const blog = await Blog.findOneAndUpdate(
			{ _id: blogId },
			{ title, body },
			{ new: true }
		);
		await blog.save();
		res.send(blog);
	} catch (err) {
		res.send(err);
	}
};

exports.deleteBlog = async (req, res) => {
	try {
		const blogId = req.params.id;
		const blog = await Blog.findByIdAndDelete({ _id: blogId });

		await req.user.blogs.pull(blogId);
		await req.user.save();

		res.send(blog);
	} catch (err) {
		res.send(err);
	}
};
