const express = require("express");
const router = express.Router();
const Buyer = require("../models/Buyer"); // Make sure this file exists!

// POST /api/buyers/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existing = await Buyer.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const newBuyer = new Buyer({ name, email, password });
    await newBuyer.save();

    res.status(201).json({ message: "Buyer registered successfully" });
  } catch (error) {
    console.error("Error in /api/buyers/register:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
