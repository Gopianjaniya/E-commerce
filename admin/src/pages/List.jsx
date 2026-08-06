import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Search, Trash2, Package, RefreshCw } from "lucide-react";

export default function List({ token }) {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) setList(res.data.products);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };

  const removeProduct = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      const res = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success(`🗑️ "${name}" deleted successfully.`);
        await fetchList();
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => { fetchList(); }, []);

  const filtered = list.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const badgeCls = (cat) =>
    cat === "Men" || cat === "Man"     ? "bg-blue-100 text-blue-700"
    : cat === "Women" || cat === "Woman" ? "bg-pink-100 text-pink-700"
    : "bg-green-100 text-green-700";

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-bold text-gray-800 text-lg">All Products</h1>
          <p className="text-gray-400 text-sm">{list.length} products listed</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="form-input pl-9 w-56"
            />
          </div>
          <button
            onClick={fetchList}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="admin-card p-0 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <Package size={44} className="mx-auto mb-3 opacity-20" />
            <p className="font-medium text-gray-500">No products found</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th className="hidden md:table-cell">Category</th>
                <th className="hidden sm:table-cell">Sizes</th>
                <th>Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm leading-snug">{item.name}</p>
                        {item.bestseller && (
                          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">BESTSELLER</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeCls(item.category)}`}>
                      {item.category === "Man" ? "Men" : item.category === "Woman" ? "Women" : item.category}
                    </span>
                    <span className="ml-1.5 text-xs text-gray-400">{item.subCategory}</span>
                  </td>
                  <td className="hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {item.sizes?.slice(0,4).map((s) => (
                        <span key={s} className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="font-bold text-blue-600">
                      {currency}{item.price?.toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => removeProduct(item._id, item.name)}
                      className="btn-danger inline-flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
