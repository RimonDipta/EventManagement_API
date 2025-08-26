const Event = require("../models/Event");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      organizerName,
      eventBanner,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      organizerName,
      eventBanner,
      createdBy: req.headers._id, // from token
    });

    res.status(201).json({ success: true, message: "Event created", event });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: err.toString(),
    });
  }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.status(200).json({ success: true, events });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: err.toString(),
    });
  }
};

// Get Single Event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    res.status(200).json({ success: true, event });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
      error: err.toString(),
    });
  }
};

// Update Event (only creator)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    if (event.createdBy.toString() !== req.headers._id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Event updated", event: updatedEvent });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: err.toString(),
    });
  }
};

// Delete Event (only creator)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    if (event.createdBy.toString() !== req.headers._id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    await event.deleteOne();

    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: err.toString(),
    });
  }
};
