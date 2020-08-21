const express = require("express");
const server = express();
const userRouter = require("./routes/UserRoute/UserRoute");

const PORT = process.env.PORT || 4000;

server.use(userRouter);
server.listen(PORT, () => {
	console.log("server is running on port:", PORT);
});
