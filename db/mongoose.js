const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/portfolio-blog", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
