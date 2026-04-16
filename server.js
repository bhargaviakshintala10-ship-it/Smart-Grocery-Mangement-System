import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; // ✅ ADD THIS

dotenv.config();

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json()); // 🔥 VERY IMPORTANT

// ✅ MONGODB ATLAS CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// ✅ ROUTES
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes); // ✅ ADD THIS

// ✅ TEST ROUTE (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});