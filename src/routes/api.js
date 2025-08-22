const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

let router = express.Router();

// Register a new user
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user", authMiddleware, userController.user);
router.get("/logout", authMiddleware, userController.logout);
router.put("/update", authMiddleware, userController.update);

module.exports = router;
