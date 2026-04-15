// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();
// serve images


// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // parse JSON bodies
app.use(cors()); // allow frontend (React) to connect

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/auth"); // handles /signup and /login
app.use("/api", authRoutes);


const eventRoutes = require("./routes/event");
app.use("/api", eventRoutes);
app.use("/uploads", express.static("uploads")); 
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
