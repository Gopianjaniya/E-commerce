import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
    subCategory: { type: String, require: true },
    image: { type: Array, require: true },
    sizes: { type: Array, require: true },
    date: { type: Number, require: true },
    bestseller: { type: Boolean },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
