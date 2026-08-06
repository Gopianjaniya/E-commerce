import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { motion } from "framer-motion";
import { Package, RefreshCw } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const statusMap = {
  "Order Placed":    { color: "bg-blue-100 text-blue-700",   dot: "bg-blue-500" },
  Packing:          { color: "bg-yellow-100 text-yellow-700",dot: "bg-yellow-500" },
  Shipping:         { color: "bg-purple-100 text-purple-700",dot: "bg-purple-500" },
  "Out for Delivery":{ color: "bg-orange-100 text-orange-700",dot: "bg-orange-500" },
  Delivered:        { color: "bg-green-100 text-green-700",  dot: "bg-green-500" },
};

export default function Orders() {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!token) return;
    try {
      setLoading(true);
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
            item.payment = o.payment;
            item.paymentMethod = o.paymentMethod;
            item.date = o.date;
            all.push(item);
          })
        );
        setOrderData(all.reverse());
      }
    } catch (_) {}
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [token]);

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <Title text1="MY" text2="ORDERS" />
          <button
            onClick={load}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="card p-4 h-28 animate-pulse bg-gray-100" />
            ))}
          </div>
        ) : orderData.length === 0 ? (
          <div className="text-center py-24">
            <Package size={56} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">No orders yet</h3>
            <p className="text-gray-400 text-sm">Your orders will appear here once you place them.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orderData.map((item, i) => {
              const s = statusMap[item.status] || { color: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };
              return (
                <div key={i} className="card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Image */}
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                      <span className="font-bold text-blue-600">{currency}{item.price?.toLocaleString("en-IN")}</span>
                      <span>Qty: <b>{item.quantity}</b></span>
                      <span>Size: <b>{item.size}</b></span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-400">
                      <span>{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span className="capitalize">{item.paymentMethod}</span>
                      <span className={item.payment ? "text-green-600 font-medium" : "text-orange-500 font-medium"}>
                        {item.payment ? "Paid" : "Payment Pending"}
                      </span>
                    </div>
                  </div>

                  {/* Status + Track */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-3 flex-shrink-0">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${s.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {item.status}
                    </span>
                    <button className="btn-outline text-xs px-4 py-1.5">Track Order</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
