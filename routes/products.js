const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/', async (req, res) => {
  try {
    const { sellerId, name, price, stock, description } = req.body;
    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID is required" });
    }
    const newProduct = new Product({
      sellerId,
      name,
      price,
      stock,
      description
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.error("Error in /api/products:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
