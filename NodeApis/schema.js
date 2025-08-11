import mongoose from "mongoose";

const shoppyGlobalSchemas = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true }, 
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String, 
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ShoppyGlobalSchemasModel = mongoose.model(
  "shoppyglobalSchema",
  shoppyGlobalSchemas,
  "products"
);
export default ShoppyGlobalSchemasModel;
