const controller = require("../controllers/users.controller");
const express = require("express");
const router = express.Router();

//calling the routes using router
router.post("/register", userController.register);
router.post("/login" , userController.login);
router.get("/user-profile", userController.userProfile);

module.exports = router;

