import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import ShoppyGlobalSchemasModel from "./schema.js";
import RegistrationModel from "./registration_schema.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(`❌ MongoDB Connection Error: ${err.message}`));

// ---------- API Routes ----------

// Registration
app.post("/api/registration", async (req, res) => {
  try {
    const reg = new RegistrationModel(req.body);
    const savedReg = await reg.save();
    res.status(200).json({ savedReg });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Login with Token
app.post("/api/login", async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    // Find user by email
    const user = await RegistrationModel.findOne({ userEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Password check
    if (user.userPassword !== userPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT token
    const accessToken = jwt.sign(
      { userEmail },
      process.env.JWT_SECRET || "secretKey"
    );

    res.status(200).json({
      message: "Login successful",
      token: accessToken
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Server error in /api/login"
    });
  }
});

// Add Product
app.post("/api/products", async (req, res) => {
  try {
    const product = new ShoppyGlobalSchemasModel(req.body);
    const savedProduct = await product.save();
    res.status(200).json({ savedProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Fetch All Products
app.get("/api/getdata", async (req, res) => {
  try {
    const allProduct = await ShoppyGlobalSchemasModel.find(
      {},
      { _id: 0, __v: 0 }
    );
    res.status(200).json(allProduct);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Fetching Data", error: err.message });
  }
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 8778;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
