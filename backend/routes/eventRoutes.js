import express from "express";
import Event from "../models/Event.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET ALL EVENTS (Public) */

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* CREATE EVENT (Admin only) */

router.post("/", authMiddleware, async (req, res) => {
  try {

    const newEvent = new Event(req.body);

    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
});


/* UPDATE EVENT (Admin only) */

router.put("/:id", authMiddleware, async (req, res) => {
  try {

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEvent);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
});


/* DELETE EVENT (Admin only) */

router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted successfully" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
});

export default router;