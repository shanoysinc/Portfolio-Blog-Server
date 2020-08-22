const Blog = require("../../model/Blog");

exports.createBlog = async (req, res) => {
	try {
		console.log(req.body);
		console.log(req.user._id);
		const { title, body } = req.body;
		const blog = new Blog({ title, body, user: req.user._id });
		await blog.save();
		res.send(blog);
	} catch (err) {
		res.send(err);
	}
};
