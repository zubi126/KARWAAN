// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import eventRoutes from "./routes/eventRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// /* ROUTES */

// app.use("/api/events", eventRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/admin", adminRoutes);

// /* DATABASE */

// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     console.log("MongoDB Connected");
// })
// .catch(err => {
//     console.log(err);
// });

// /* SERVER */

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import eventRoutes from "./routes/eventRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

/* LOAD ENV */

console.log("🔹 Starting KAARWAAN backend...");

dotenv.config();

console.log("🔹 Environment variables loaded");

/* CHECK ENV VARIABLES */

console.log("🔹 MONGO_URI exists:", process.env.MONGO_URI ? "YES" : "NO");
console.log("🔹 JWT_SECRET exists:", process.env.JWT_SECRET ? "YES" : "NO");
console.log("🔹 ADMIN_SECRET exists:", process.env.ADMIN_SECRET ? "YES" : "NO");

/* APP INIT */

const app = express();

console.log("🔹 Express app initialized");

/* MIDDLEWARE */

app.use(cors());
app.use(express.json());

console.log("🔹 Middleware loaded");

/* ROUTES */

app.use("/api/events", eventRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

console.log("🔹 Routes registered");

/* DATABASE CONNECTION */

console.log("🔹 Connecting to MongoDB...");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch(err => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
});

/* SERVER START */

const PORT = process.env.PORT || 5000;

console.log("🔹 Starting server on port:", PORT);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});