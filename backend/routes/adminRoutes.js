import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

/* ADMIN LOGIN */

router.post("/login", (req, res) => {

  const { secret } = req.body;

  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ message: "Invalid secret key" });
  }

  const token = jwt.sign(
    { admin: true },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token
  });

});

export default router;