import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Edit3,
  Save,
  X,
  Package,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Profile() {
  const { token, backendUrl, navigate, products, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "ApnaCart User",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "India",
  });

  // Load orders
  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    const loadOrders = async () => {
      try {
        const res = await axios.post(
          backendUrl + "/api/order/userorders",
          {},
          { headers: { token } }
        );
        if (res.data.success) {
          let all = [];
          res.data.order.forEach((o) =>
            o.items.forEach((item) => {
              item.status = o.status;
              item.date = o.date;
              all.push(item);
            })
          );
          setOrderData(all.reverse().slice(0, 5));
        }
      } catch (_) {}
    };
    loadOrders();
    // Pre-fill email from localStorage / token if available
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");
    if (savedName) setProfile((p) => ({ ...p, name: savedName }));
    if (savedEmail) setProfile((p) => ({ ...p, email: savedEmail }));
  }, [token]);

  const handleSave = () => {
    localStorage.setItem("userName", profile.name);
    localStorage.setItem("userEmail", profile.email);
    toast.success("Profile updated successfully!");
    setEditing(false);
  };

  const statusColor = (status) => {
    const map = {
      "Order Placed": "bg-blue-100 text-blue-700",
      Packing: "bg-yellow-100 text-yellow-700",
      Shipping: "bg-purple-100 text-purple-700",
      "Out for Delivery": "bg-orange-100 text-orange-700",
      Delivered: "bg-green-100 text-green-700",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Title text1="MY" text2="PROFILE" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left: Avatar + quick stats ── */}
          <div className="space-y-5">
            {/* Avatar card */}
            <div className="card p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3 shadow-lg">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="font-bold text-gray-800 text-lg">{profile.name}</h2>
              <p className="text-gray-400 text-sm">{profile.email || "No email set"}</p>
              <span className="inline-flex items-center gap-1 mt-2 text-xs bg-green-50 text-green-600 font-semibold px-3 py-1 rounded-full border border-green-100">
                ✓ Verified Customer
              </span>
            </div>

            {/* Quick stats */}
            <div className="card p-5 space-y-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account Overview</p>
              {[
                { icon: <ShoppingBag size={15} />, label: "Total Orders", val: orderData.length },
                { icon: <Package size={15} />, label: "Delivered", val: orderData.filter(o => o.status === "Delivered").length },
                { icon: <Calendar size={15} />, label: "Member Since", val: "2025" },
              ].map(({ icon, label, val }) => (
                <div key={label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="flex items-center gap-2 text-sm text-gray-500">{icon}{label}</span>
                  <span className="font-semibold text-gray-800 text-sm">{val}</span>
                </div>
              ))}
            </div>

            <Link to="/orders" className="btn-primary block text-center w-full">
              View All Orders
            </Link>
          </div>

          {/* ── Right: Profile details + recent orders ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Profile form */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-800">Personal Information</h3>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(false)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} /> Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1 text-sm text-blue-600 font-semibold hover:text-blue-700"
                    >
                      <Save size={14} /> Save
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <User size={15} />, label: "Full Name", key: "name", type: "text" },
                  { icon: <Mail size={15} />, label: "Email", key: "email", type: "email" },
                  { icon: <Phone size={15} />, label: "Phone", key: "phone", type: "tel" },
                  { icon: <MapPin size={15} />, label: "City", key: "city", type: "text" },
                  { icon: <MapPin size={15} />, label: "State", key: "state", type: "text" },
                  { icon: <MapPin size={15} />, label: "Country", key: "country", type: "text" },
                ].map(({ icon, label, key, type }) => (
                  <div key={key}>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      {icon} {label}
                    </label>
                    {editing ? (
                      <input
                        type={type}
                        value={profile[key]}
                        onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                        className="input-modern"
                        placeholder={`Enter ${label}`}
                      />
                    ) : (
                      <p className="text-sm text-gray-700 font-medium py-2 px-3 bg-gray-50 rounded-lg">
                        {profile[key] || <span className="text-gray-400 italic">Not set</span>}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent orders */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Recent Orders</h3>
                <Link to="/orders" className="text-sm text-blue-600 font-medium hover:underline">
                  See all →
                </Link>
              </div>
              {orderData.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <Package size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No orders yet. Start shopping!</p>
                  <Link to="/collection" className="btn-primary inline-block mt-4 text-sm">
                    Browse Collection
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orderData.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {currency}{item.price} · Qty: {item.quantity} · {item.size}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
