const express = require("express");
const router = express.Router();

/**
 * 🔹 Mock Online Payment (simulates Razorpay success)
 * Example request: POST /api/payments/mock
 * body: { amount: 500 }
 */
router.post("/mock", (req, res) => {
  const { amount } = req.body;

  // Simulate an order response
  const mockOrder = {
    id: "order_mock_" + Date.now(),
    status: "created",
    amount,
    currency: "INR",
    method: "MOCK",
    message: "This is a simulated payment success (no real Razorpay involved)."
  };

  return res.json(mockOrder);
});

/**
 * 🔹 Cash on Delivery (COD)
 * Example request: POST /api/payments/cod
 * body: { amount: 500 }
 */
router.post("/cod", (req, res) => {
  const { amount } = req.body;

  // Simulate confirmed COD order
  const codOrder = {
    id: "order_cod_" + Date.now(),
    status: "confirmed",
    amount,
    currency: "INR",
    method: "COD",
    message: "COD order placed successfully. Pay at delivery."
  };

  return res.json(codOrder);
});

module.exports = router;
