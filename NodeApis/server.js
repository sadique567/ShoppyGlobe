import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import ShoppyGlobalSchemasModel from "./schema.js";
import RegistrationModel from "./registration_schema.js";
import jwt from "jsonwebtoken"

// const dotenv = require('dotenv');
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(`Something is wrong ${err}`);
  });

app.listen(8778, () => {
  console.log("server is running on 8778");
});

// mongodb+srv://mohdsadique008:<db_password>@shoppyblobal.epml5c8.mongodb.net/
// Reliwell12345  mohdsadique008

// login_user  ------------------ user Registration -----------
app.post("/api/registration" , async (req , res)=>{
  try{
    const reg = new RegistrationModel(req.body);
    const savedReg = await reg.save();
    res.status(200).json({savedReg});
  }
  catch (e){
    res.status(400).json({message : e.message});
  }

})

// -----------Login with Token---------
app.post("/api/login", async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    // Step 1: Email se user find karo
    const user = await RegistrationModel.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Password check karo
    if (user.userPassword !== userPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const accessToken = jwt.sign({userEmail : userEmail , userPassword : userPassword} , "secretKey");

    // Step 3: Login success
    res.status(200).json({
      message: "Login successful",
      token : accessToken
    
    });

  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Server error in /api/login"
    });
  }
});





// ----------Fetch ALL  Data ----------------------------
app.post("/api/products", async (req, res) => {
  try {
    const product = new ShoppyGlobalSchemasModel(req.body);
    const savedProduct = await product.save();
    res.status(200).json({ savedProduct });
  } catch (err) {
    console.log(`/api/products   ${err}`);
    res.status(400).json({ message: err.message });
  }
});


app.get("/api/getdata" , async (req , res)=>{
 try{
       const allProduct = await ShoppyGlobalSchemasModel.find({} ,  { _id: 0, __v: 0 });
    res.status(200).json(allProduct);

 }
 catch(err){
    res.status(500).json({message :  "Error Fetching Data" , error : err.message})
 }
});
