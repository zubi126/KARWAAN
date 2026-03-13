import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import eventRoutes from "./routes/eventRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */

app.use("/api/events", eventRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

/* DATABASE */

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch(err => {
    console.log(err);
});

/* SERVER */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});