import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true, // ✅ IMPORTANT
  },
  image: {
    type: String,
    default: "",
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    default: "General",
  },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);  