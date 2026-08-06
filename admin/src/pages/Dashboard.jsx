import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import {
  Package, ShoppingCart, TrendingUp, Users,
  ArrowUpRight, RefreshCw, Clock
} from "lucide-react";

export default function Dashboard({ token }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const [ordRes, proRes] = await Promise.all([
        axios.post(backendUrl + "/api/order/list", {}, { headers: { token } }),
        axios.get(backendUrl + "/api/product/list"),
      ]);
      if (ordRes.data.success) setOrders(ordRes.data.orders);
      if (proRes.data.success) setProducts(proRes.data.products);
    } catch (_) {
      toast.error("Failed to load dashboard data");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [token]);

  const totalRevenue = orders.reduce((s, o) => s + (o.amount || 0), 0);
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const pending = orders.filter((o) => o.status !== "Delivered").length;

  const stats = [
    {
      icon: <TrendingUp size={22} />,
      label: "Total Revenue",
      value: `${currency}${totalRevenue.toLocaleString("en-IN")}`,
      sub: `From ${orders.length} orders`,
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <Package size={22} />,
      label: "Total Products",
      value: products.length,
      sub: `${products.filter(p => p.bestseller).length} bestsellers`,
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: <ShoppingCart size={22} />,
      label: "Total Orders",
      value: orders.length,
      sub: `${delivered} delivered`,
      color: "bg-green-50 text-green-600",
    },
    {
      icon: <Clock size={22} />,
      label: "Pending Orders",
      value: pending,
      sub: "Awaiting fulfilment",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  const statusColor = (s) => ({
    "Order Placed":    "status-placed",
    Packing:          "status-packing",
    Shipping:         "status-shipping",
    "Out for Delivery":"status-out",
    Delivered:        "status-delivered",
  })[s] || "bg-gray-100 text-gray-600";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="font-bold text-gray-800 text-xl">Dashboard</h1>
          <p className="text-gray-400 text-sm">Welcome back, Admin 👋</p>
        </div>
        <button
          onClick={fetchData}
          className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon, label, value, sub, color }) => (
          <div key={label} className="stat-card">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
              {icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
              <p className="font-extrabold text-gray-800 text-xl mt-0.5">{loading ? "—" : value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        {/* Recent orders */}
        <div className="admin-card p-0 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Recent Orders</h2>
            <span className="text-xs text-gray-400">{orders.length} total</span>
          </div>
          {loading ? (
            <div className="p-5 space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-14 rounded-xl bg-gray-100 animate-pulse" />)}
            </div>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-sm">No orders yet</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {orders.slice(0, 8).map((order, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Package size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""} · {new Date(order.date).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <span className={`status-badge ${statusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="font-bold text-blue-600 text-sm whitespace-nowrap">
                    {currency}{order.amount?.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top products */}
        <div className="admin-card p-0 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Top Products</h2>
            <ArrowUpRight size={16} className="text-gray-400" />
          </div>
          {loading ? (
            <div className="p-5 space-y-3">
              {[1,2,3,4].map(i => <div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse" />)}
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {products.filter(p => p.bestseller).slice(0, 6).map((p, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                  <img
                    src={p.image[0]}
                    alt={p.name}
                    className="w-10 h-10 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.category} · {p.subCategory}</p>
                  </div>
                  <span className="font-bold text-blue-600 text-sm">{currency}{p.price?.toLocaleString("en-IN")}</span>
                </div>
              ))}
              {products.filter(p => p.bestseller).length === 0 && (
                <p className="text-center text-gray-400 py-8 text-sm">No bestsellers yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
