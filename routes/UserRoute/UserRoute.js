require("../../services/passport");
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController/userController");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", requireAuth, (req, res) => {
	res.send(req.user);
});

router.post("/signin", userController.signin);

router.post("/signup", userController.signup);

router.post("/logout", userController.logout);

module.exports = router;
