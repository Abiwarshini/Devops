const express = require("express");
const multer = require("multer");
const path = require("path");
const Event = require("../models/Event");
const User = require("../models/User");
const sendEmail = require("../email");

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });


router.post("/events", upload.single("eventImage"), async (req, res) => {
  try {
    const newEvent = new Event({
      eventName: req.body.eventName,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      description: req.body.description,
      category: req.body.category,
      tickets: {
        vip: {
          price: req.body.vip_price,
          capacity: req.body.vip_capacity,
        },
        normal: {
          price: req.body.normal_price,
          capacity: req.body.normal_capacity,
        },
      },
      image: req.file ? req.file.filename : null,
      createdBy: req.body.userId || null, 
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully!", event: newEvent });

    const users = await User.find();
    users.forEach(user => {
      sendEmail(
        user.email,
        "New Event Created!",
        `Hi ${user.name || "User"},\n\nA new event "${newEvent.eventName}" has been created!\n\nDate: ${newEvent.date}\nLocation: ${newEvent.location}`
      ).catch(err => console.error(`Email failed for ${user.email}:`, err));
    });

  } catch (err) {
    console.error("Create event failed:", err);
    res.status(500).json({ message: "Failed to create event" });
  }
});

router.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error("Fetch events failed:", err);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

router.get("/events/my-events/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userEvents = await Event.find({ createdBy: userId }).sort({ createdAt: -1 });
    res.json(userEvents);
  } catch (err) {
    console.error("Failed to fetch user events:", err);
    res.status(500).json({ message: "Failed to fetch user events" });
  }
});


router.get("/events/registered/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const events = await Event.find({ registeredUsers: userId }).sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error("Failed to fetch registered events:", err);
    res.status(500).json({ message: "Failed to fetch registered events" });
  }
});


router.delete("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete event failed:", err);
    res.status(500).json({ message: "Failed to delete event" });
  }
});

module.exports = router;
