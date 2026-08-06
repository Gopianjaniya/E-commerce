import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { UploadCloud, X, Package } from "lucide-react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function Add({ token }) {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const setImage = (idx, file) =>
    setImages((prev) => { const n = [...prev]; n[idx] = file; return n; });

  const toggleSize = (s) =>
    setSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const resetForm = () => {
    setImages([null, null, null, null]);
    setName(""); setDescription(""); setPrice("");
    setCategory("Men"); setSubCategory("Topwear");
    setBestseller(false); setSizes([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sizes.length === 0) { toast.warning("Please select at least one size."); return; }

    for (const img of images.filter(Boolean)) {
      if (img.size > 2 * 1024 * 1024) { toast.error("Each image must be under 2MB."); return; }
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("description", description);
      fd.append("price", price);
      fd.append("category", category);
      fd.append("subCategory", subCategory);
      fd.append("bestseller", bestseller);
      fd.append("sizes", JSON.stringify(sizes));
      images.forEach((img, i) => img && fd.append(`image${i + 1}`, img));

      const res = await axios.post(backendUrl + "/api/product/add", fd, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success(`✅ "${name}" added successfully!`);
        resetForm();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-7">
        <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
          <Package size={18} />
        </div>
        <div>
          <h1 className="font-bold text-gray-800 text-lg">Add New Product</h1>
          <p className="text-gray-400 text-xs">Fill in the details below to list a new product.</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Images */}
        <div className="admin-card">
          <p className="font-semibold text-gray-700 text-sm mb-4">Product Images <span className="text-gray-400 font-normal">(up to 4)</span></p>
          <div className="flex flex-wrap gap-4">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <label htmlFor={`img-${i}`}>
                  {img ? (
                    <div className="w-[90px] h-[90px] rounded-xl overflow-hidden border-2 border-blue-400 shadow">
                      <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" alt="" />
                    </div>
                  ) : (
                    <div className="upload-box">
                      <UploadCloud size={22} />
                      <span>Upload</span>
                    </div>
                  )}
                  <input
                    type="file"
                    id={`img-${i}`}
                    accept="image/*"
                    hidden
                    onChange={(e) => setImage(i, e.target.files[0])}
                  />
                </label>
                {img && (
                  <button
                    type="button"
                    onClick={() => setImage(i, null)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <X size={10} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Basic info */}
        <div className="admin-card space-y-4">
          <p className="font-semibold text-gray-700 text-sm">Product Information</p>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Product Name *</label>
            <input className="form-input" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Men Slim Fit Polo T-Shirt" required />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Description *</label>
            <textarea className="form-input" value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the product — fabric, fit, occasions…" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Category *</label>
              <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Sub Category *</label>
              <select className="form-input" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                <option>Topwear</option>
                <option>Bottomwear</option>
                <option>Winterwear</option>
                <option>Footwear</option>
                <option>Accessories</option>
                <option>Ethnic</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Price (₹) *</label>
              <input className="form-input" type="number" min="0" value={price}
                onChange={(e) => setPrice(e.target.value)} placeholder="999" required />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="admin-card">
          <p className="font-semibold text-gray-700 text-sm mb-4">Sizes Available *</p>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSize(s)}
                className={`size-pill ${sizes.includes(s) ? "selected" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller toggle */}
        <div className="admin-card flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-700 text-sm">Mark as Bestseller</p>
            <p className="text-gray-400 text-xs mt-0.5">Bestsellers appear in the featured section on the homepage.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only" checked={bestseller} onChange={() => setBestseller((p) => !p)} />
            <div className={`w-11 h-6 rounded-full transition-colors ${bestseller ? "bg-blue-600" : "bg-gray-200"}`}>
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${bestseller ? "translate-x-5" : ""}`} />
            </div>
          </label>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="btn-blue w-full py-3 flex items-center justify-center gap-2 text-base">
          {loading ? "Adding Product…" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
