import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array,require:true },
  amount: { type: Number, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  address: { type: Object, required: true },
  paymentMethod: { type: String, required: true, default: "false" },
  payment: { type: Boolean, required: true, default: "false" },
  date: { type: Number, required: true },
});

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
