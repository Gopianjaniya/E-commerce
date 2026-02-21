import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// getway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// global varoable
const currency = "inr";
const deliveryCharge = 10;

//Placing Order using COD Method
const placeOrder = async (req, res) => {
  console.log(process.env.PORT);

  try {
    const { userId, address, items, amount } = req.body;

    const orderData = {
      userId,
      address,
      items,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    await orderModel.create(orderData);

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Oredr Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Create Stripe Payment Intent for frontend Elements
const createPaymentIntent = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      address,
      items,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const order = await orderModel.create(orderData);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Make sure amount is in smallest currency unit (e.g., paise/cents)
      currency: currency,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      orderId: order._id,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Stripe Webhook handler
const stripeWebhook = async (req, res) => {
  const payload = req.rawBody || req.body;
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;

    // Fulfill the order! Update DB status to 'Paid'
    await orderModel.findByIdAndUpdate(orderId, { payment: true });

    // Clear user's cart
    const order = await orderModel.findById(orderId);
    if (order && order.userId) {
      await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
    }

    console.log("Payment succeeded for order:", orderId);
  }

  res.send(); // Return 200 OK
};

//Placing Order using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
  try {
    console.log("..........................");

    const { userId, items, amount, address } = req.body;

    const ordertData = {
      userId,
      address,
      items,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const order = await orderModel.create(ordertData);
    console.log(order);

    const option = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: order._id.toString(),
    };
    await razorpayInstance.create(option, (error, order) => {
      if (error) {
        console.log(error);
        res.json({ success: false, message: error });
      }
      return res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//All Order data for Admin panel
const allOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//user order data  for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const order = await orderModel.find({ userId });
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//user order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default {
  placeOrder,
  createPaymentIntent,
  stripeWebhook,
  placeOrderRazorpay,
  userOrders,
  updateStatus,
  allOrder,
};
