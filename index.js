const dotenv = require("dotenv");
dotenv.config();
console.log("✅ ENV Loaded?", process.env);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const paymentRoutes = require("./routes/payment");
const sellerRoutes = require("./routes/sellers");
const buyerRoutes = require("./routes/buyers");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders"); // Add orders route

const app = express();

// ✅ Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ CORS configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5500").split(",").filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow curl or Postman
    if (!allowedOrigins.length || allowedOrigins.some(a => origin.includes(a))) {
      return cb(null, true);
    }
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Health check routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running fine 🚀" });
});

app.get("/health", (req, res) => res.json({ ok: true, uptime: process.uptime() }));

// ✅ API routes
app.use("/api/sellers", sellerRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes); // Include orders route
app.use("/api/payments", paymentRoutes);

// ✅ Global error handler for CORS and other errors
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: err.message });
});

app.get("/", (req, res) => {
  res.send("Welcome to the SurgiPharma Market API!");
});

// ✅ MongoDB connection and server start
async function start() {
  try {
    console.log("🔍 MongoDB URI from .env:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`✅ API listening on port ${PORT}`));

    console.log("✅ MongoDB Connected");
  } catch (e) {
    console.error("❌ Mongo connect error:", e);
    process.exit(1);
  }
}

start();
