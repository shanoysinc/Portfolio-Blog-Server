require("../../services/passport");
const express = require("express");
const route = express.Router();
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const blogController = require("../../controllers/blogController/blogController");

route.post("/createBlog", requireAuth, blogController.createBlog);

// route.get("/user/:username/:blogId", blogController.getBlog);

route.patch("/updateBlog/:id", requireAuth, blogController.updateBlog);

route.delete("/deleteBlog/:id", requireAuth, blogController.deleteBlog);

module.exports = route;
