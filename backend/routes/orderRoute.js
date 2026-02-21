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
orderRouter.post(
  "/create-payment-intent",
  authUser,
  orderController.createPaymentIntent,
);
orderRouter.post("/webhook", orderController.stripeWebhook);

// User Feature
orderRouter.post("/userorders", authUser, orderController.userOrders);

 

export default orderRouter;
