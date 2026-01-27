import express from "express";
import orderController from "../controller/orderController.js";
import { verifyToken } from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
const orderRouter = express.Router();

// Admin Feature
orderRouter.post("/list", verifyToken, orderController.allOrder);
orderRouter.post("/status", verifyToken, orderController.updateStatus);

//  Payment feature
orderRouter.post("/place", authUser, orderController.placeOrder);
// orderRouter.post("/stripe", authUser, orderController.placeOrderStripe);
orderRouter.post("/razorpay", authUser, orderController.placeOrderRazorpay);

// User Feature
orderRouter.post("/userorders", authUser, orderController.userOrders);

//verify Stripe

orderRouter.post('/verifyStripe',authUser,orderController.verifyStripe)

export default orderRouter;
