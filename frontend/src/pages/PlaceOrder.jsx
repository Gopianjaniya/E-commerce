import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { Landmark, Smartphone, Wallet, CreditCard } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const paymentMethods = [
  { id: "stripe", icon: <Wallet size={18} />, label: "Stripe" },
  { id: "razorpay", icon: <Smartphone size={18} />, label: "Razorpay" },
  { id: "netbanking", icon: <Landmark size={18} />, label: "Net Banking" },
  { id: "cod", icon: <CreditCard size={18} />, label: "Cash on Delivery" },
];

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
    <input className="input-modern" {...props} />
  </div>
);

export default function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const { navigate, backendUrl, cartItems, setCartItems, delivery_fee, token, getCartAmount, products } =
    useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    street: "", city: "", state: "",
    zipcode: "", country: "", phone: "",
  });

  const onChange = (e) => setFormData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let orderItems = [];
      for (const id in cartItems) {
        for (const size in cartItems[id]) {
          if (cartItems[id][size] > 0) {
            const info = structuredClone(products.find((p) => p._id === id));
            if (info) { info.size = size; info.quantity = cartItems[id][size]; orderItems.push(info); }
          }
        }
      }
      const orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee };

      if (method === "cod") {
        const res = await axios.post(backendUrl + "/api/order/place", orderData, {
          headers: { token: localStorage.getItem("token") },
        });
        if (res.data.success) {
          setCartItems({});
          toast.success("Order placed successfully! 🎉");
          navigate("/orders");
        } else toast.error(res.data.message);
      } else if (method === "stripe") {
        const res = await axios.post(backendUrl + "/api/order/create-payment-intent", orderData, {
          headers: { token },
        });
        if (res.data.success) {
          navigate("/stripe-checkout", { state: { clientSecret: res.data.clientSecret, orderId: res.data.orderId } });
        } else toast.error(res.data.message);
      } else {
        toast.info(`${method} integration coming soon!`);
      }
    } catch (err) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <Title text1="CHECKOUT" text2="" />
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          {/* ── Left: Delivery Info ── */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                Delivery Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="First Name" name="firstName" value={formData.firstName} onChange={onChange} placeholder="Rahul" required />
                <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={onChange} placeholder="Sharma" required />
                <div className="sm:col-span-2">
                  <InputField label="Email" name="email" type="email" value={formData.email} onChange={onChange} placeholder="you@email.com" required />
                </div>
                <div className="sm:col-span-2">
                  <InputField label="Street Address" name="street" value={formData.street} onChange={onChange} placeholder="123 Main St, Apartment 4" required />
                </div>
                <InputField label="City" name="city" value={formData.city} onChange={onChange} placeholder="Mumbai" required />
                <InputField label="State" name="state" value={formData.state} onChange={onChange} placeholder="Maharashtra" required />
                <InputField label="PIN Code" name="zipcode" type="number" value={formData.zipcode} onChange={onChange} placeholder="400001" required />
                <InputField label="Country" name="country" value={formData.country} onChange={onChange} placeholder="India" required />
                <div className="sm:col-span-2">
                  <InputField label="Phone Number" name="phone" type="number" value={formData.phone} onChange={onChange} placeholder="+91 98765 43210" required />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card p-6">
              <h2 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                Payment Method
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {paymentMethods.map(({ id, icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setMethod(id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                      method === id
                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md"
                        : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
                    }`}
                  >
                    <span className={method === id ? "text-blue-600" : "text-gray-400"}>{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Summary ── */}
          <div className="space-y-4">
            <CartTotal />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2"
            >
              {loading ? <span className="spinner" /> : `Place Order — ${method.toUpperCase()}`}
            </button>
            <p className="text-center text-xs text-gray-400">
              🔒 Your payment information is secured with 256-bit SSL encryption.
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
