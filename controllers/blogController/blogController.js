const Blog = require("../../model/Blog");
const User = require("../../model/User");

exports.createBlog = async (req, res) => {
	try {
		const { title, body } = req.body;
		const blog = new Blog({ title, body, author: req.user._id });

		await blog.save();
		req.user.Blog.push(blog._id);

		await req.user.save();
		res.send(blog);
	} catch (err) {
		res.send(err);
	}
};

exports.getBlogs = async (req, res) => {
	try {
		const blog = await User.findOne({ _id: req.user._id })
			.populate("Blog")
			.exec();
		res.send(blog);
	} catch (err) {
		res.send(err);
	}
};
