const express = require('express');
const router = express.Router();
const Seller = require('../models/seller');

// Register seller
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newSeller = new Seller({ name, email, password });
    await newSeller.save();
    res.json(newSeller);
  } catch (error) {
    console.error("Error in /sellers/register:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all sellers
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find({});
    res.json(sellers);
  } catch (error) {
    console.error("Error in /sellers:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
