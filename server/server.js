const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["https://kailasmutkule.netlify.app/"],
  }),
);
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Portfolio API is running." });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message:
          "Contact service is temporarily unavailable. Please email me directly at kailasmutkule99@gmail.com.",
      });
    }

    await Message.create({ name, email, message });

    res.json({
      success: true,
      message: "Thanks! Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please email me directly.",
    });
  }
});

app.use(express.static(path.join(__dirname, "../client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

async function startServer() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected.");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      console.log(
        "The portfolio will still start, but the database contact form will be unavailable.",
      );
    }
  } else {
    console.log(
      "MONGODB_URI is not set. Add it to .env for the database contact form.",
    );
  }

  app.listen(PORT, () => {
    console.log(`Portfolio running on http://localhost:${PORT}`);
  });
}

startServer();
