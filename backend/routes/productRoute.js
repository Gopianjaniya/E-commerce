import express from "express";
import productController from "../controller/productController.js";
import upload from "../middleware/multer.js";
import { verifyToken } from "../middleware/adminAuth.js";

const   productRouter = express.Router();

productRouter.post(
  "/add",
  verifyToken,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 2 },
    { name: "image3", maxCount: 3 },
    { name: "image4", maxCount: 4 },
  ]),
  productController.addProduct
);
productRouter.delete("/remove/:id", verifyToken, productController.removeProduct);
productRouter.get("/single", productController.singleProduct);
productRouter.get("/list", productController.listProduct);

export default productRouter;
