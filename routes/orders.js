const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const { buyerId, productId, quantity, paymentMethod } = req.body;
    const order = new Order({ buyerId, productId, quantity, paymentMethod });
    await order.save();
    res.json({ success: true, order });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
