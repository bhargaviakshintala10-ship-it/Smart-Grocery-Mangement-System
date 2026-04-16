import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// ✅ GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD PRODUCT
router.post("/add", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔍 DEBUG

    const { name, price, stock } = req.body;

    if (!name || !price || stock === undefined) {
      return res.status(400).json({
        message: "Name, Price, Stock required",
      });
    }

    const newProduct = new Product(req.body);
    const saved = await newProduct.save();

    res.json(saved);
  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;