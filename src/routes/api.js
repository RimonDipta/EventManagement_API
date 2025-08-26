const express = require("express");
const userController = require("../controllers/userController");
const eventController = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");

let router = express.Router();

// User API
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user", authMiddleware, userController.user);
router.get("/logout", authMiddleware, userController.logout);
router.put("/update", authMiddleware, userController.update);

// Event API
router.post("/create-event", authMiddleware, eventController.createEvent);
router.get("/events", authMiddleware, eventController.getAllEvents);
router.get("/event/:id", authMiddleware, eventController.getEventById);
router.put("/event/:id", authMiddleware, eventController.updateEvent);
router.delete("/event/:id", authMiddleware, eventController.deleteEvent);

module.exports = router;
