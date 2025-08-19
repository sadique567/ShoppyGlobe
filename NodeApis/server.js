import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import ShoppyGlobalSchemasModel from "./schema.js";
import RegistrationModel from "./registration_schema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: "*", // Change to frontend URL in production
  credentials: true
}));

// eslint-disable-next-line no-undef
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
})
.then(() => console.log("DB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

app.listen(8778, () => {
  console.log("Server is running on 8778");
});

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

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await RegistrationModel.findOne({ userEmail });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.userPassword !== userPassword) return res.status(401).json({ message: "Invalid password" });

    // eslint-disable-next-line no-undef
    const accessToken = jwt.sign({ userEmail }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful", token: accessToken });
  } catch (e) {
    res.status(500).json({ error: e.message, message: "Server error in /api/login" });
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

// Get Products
app.get("/api/getdata", async (req, res) => {
  try {
    const allProduct = await ShoppyGlobalSchemasModel.find({}, { _id: 0, __v: 0 });
    res.status(200).json(allProduct);
  } catch (err) {
    res.status(500).json({ message: "Error Fetching Data", error: err.message });
  }
});

// Get single product by id
app.get("/api/getdata/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // findOne because tumhare MongoDB me 'id' field numeric/string ho sakta hai
    const product = await ShoppyGlobalSchemasModel.findOne(
      { id: productId },
      { _id: 0, __v: 0 }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error Fetching Product", error: err.message });
  }
});


// Get Users
app.get('/api/getUser', async (req, res) => {
  try {
    const getUsers = await RegistrationModel.find({}, { _id: 0, __v: 0 });
    res.status(200).json(getUsers);
  } catch (err) {
    res.status(500).json({ message: "Error Fetching Data", error: err.message });
  }
});
