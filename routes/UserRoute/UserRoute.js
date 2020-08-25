require("../../services/passport");
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController/userController");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const localLogin = passport.authenticate("local", { session: false });

router.get("/user/:username", userController.userprofile);

router.post("/signin", localLogin, userController.signin);

router.post("/signup", userController.signup);

router.post("/logout", requireAuth, userController.logout);

module.exports = router;
