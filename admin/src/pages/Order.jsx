import axios from "axios";
import { useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Package, RefreshCw, MapPin, Phone } from "lucide-react";

const STATUS_OPTIONS = [
  "Order Placed", "Packing", "Shipping", "Out for Delivery", "Delivered",
];

const statusStyle = {
  "Order Placed":    "status-placed",
  Packing:          "status-packing",
  Shipping:         "status-shipping",
  "Out for Delivery":"status-out",
  Delivered:        "status-delivered",
};

export default function Order({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (res.data.success) setOrders(res.data.orders);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };

  const statusHandler = async (status, orderId) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(`Order status updated to "${status}"`);
        await fetchAllOrders();
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => { fetchAllOrders(); }, [token]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bold text-gray-800 text-lg">Orders</h1>
          <p className="text-gray-400 text-sm">{orders.length} total orders</p>
        </div>
        <button
          onClick={fetchAllOrders}
          className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Order cards */}
      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="admin-card h-28 animate-pulse bg-gray-50" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="admin-card text-center py-20">
          <Package size={48} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500 font-medium">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <div key={i} className="admin-card">
              <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto_auto_auto] gap-4 lg:gap-6 items-start">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Package size={20} />
                </div>

                {/* Items + address */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {order.items.map((item, j) => (
                      <span
                        key={j}
                        className="text-xs bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded-lg"
                      >
                        {item.name} × {item.quantity}
                        {item.size && ` (${item.size})`}
                      </span>
                    ))}
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <div className="flex items-start gap-1 text-xs text-gray-400 mt-0.5">
                    <MapPin size={11} className="mt-0.5 flex-shrink-0" />
                    <span>
                      {order.address.street}, {order.address.city}, {order.address.state},{" "}
                      {order.address.country} – {order.address.zipcode}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <Phone size={11} />
                    {order.address.phone}
                  </div>
                </div>

                {/* Meta */}
                <div className="text-sm space-y-1">
                  <div className="flex gap-2 text-gray-500">
                    <span className="font-medium text-gray-700">Items:</span> {order.items.length}
                  </div>
                  <div className="flex gap-2 text-gray-500">
                    <span className="font-medium text-gray-700">Method:</span>
                    <span className="uppercase text-xs font-bold">{order.paymentMethod}</span>
                  </div>
                  <div className="flex gap-2 text-gray-500">
                    <span className="font-medium text-gray-700">Payment:</span>
                    <span className={order.payment ? "text-green-600 font-semibold" : "text-orange-500 font-semibold"}>
                      {order.payment ? "Paid" : "Pending"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>

                {/* Amount */}
                <div className="font-bold text-blue-600 text-base whitespace-nowrap">
                  {currency}{order.amount?.toLocaleString("en-IN")}
                </div>

                {/* Status select */}
                <div>
                  <select
                    value={order.status}
                    onChange={(e) => statusHandler(e.target.value, order._id)}
                    className={`form-input text-xs font-semibold ${statusStyle[order.status] || ""}`}
                    style={{ minWidth: "150px" }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
