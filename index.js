require("./db/mongoose.js");
const express = require("express");
const server = express();
const userRouter = require("./routes/UserRoute/userRoute");
const blogRouter = require("./routes/blogRoute/blogRoute");
const PORT = process.env.PORT || 4000;
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.use(userRouter);
server.use(blogRouter);

server.listen(PORT, () => {
	console.log("server is running on port:", PORT);
});
