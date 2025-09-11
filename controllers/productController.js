const Product = require('../models/Product');

exports.listProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  res.json({ products });
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, description, category, images, sellerId } = req.body;
    if (!name || price == null || stock == null || !sellerId) return res.status(400).json({ message: 'Missing fields' });
    const p = await Product.create({ name, price, stock, description, category, images, sellerId });
    res.status(201).json({ product: p });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.copyProduct = async (req, res) => {
  try {
    const src = await Product.findById(req.params.id);
    if (!src) return res.status(404).json({ message: 'Product not found' });
    const { sellerId, price, stock } = req.body;
    if (!sellerId) return res.status(400).json({ message: 'sellerId required' });
    const copy = await Product.create({
      name: src.name,
      description: src.description,
      category: src.category,
      images: src.images,
      price: price != null ? price : src.price,
      stock: stock != null ? stock : src.stock,
      sellerId,
    });
    res.status(201).json({ product: copy });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
