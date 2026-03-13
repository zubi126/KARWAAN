import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

/* SUBMIT MESSAGE (Help form) */

router.post("/", async (req, res) => {
  try {

    const newMessage = new Message(req.body);

    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
});


/* GET ALL MESSAGES (Admin dashboard) */

router.get("/", async (req, res) => {
  try {

    const messages = await Message.find().sort({ createdAt: -1 });

    res.json(messages);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
});


/* DELETE MESSAGE */

router.delete("/:id", async (req, res) => {
  try {

    await Message.findByIdAndDelete(req.params.id);

    res.json({ message: "Message deleted" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
});

export default router;