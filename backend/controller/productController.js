import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// --------Function for Add-Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    //  ------------ upload to cloudinary
    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      image: imageUrl,
      bestseller: bestseller === "true" ? "true" : "false",
      Date: Date.now(),
    };

    const product = await productModel.create(productData);

    res.json({ success: true, message: "product added...", product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// --------Function for ListProduct
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// --------Function for Single-Product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// --------Function for Removing-Product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default { addProduct, removeProduct, listProduct, singleProduct };
