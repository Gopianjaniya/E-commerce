import express from "express";
import cartController from "../controller/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, cartController.addToCart);
cartRouter.post("/get", authUser, cartController.getUserCart);
cartRouter.post("/update", authUser, cartController.updateCart);

export default cartRouter;
