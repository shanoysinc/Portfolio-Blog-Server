const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController/userController");

router.post("/signin", userController.signin);

router.post("/signup", userController.signup);

router.post("/logout", userController.logout);

module.exports = router;
