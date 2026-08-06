import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Star, StarHalf, Check, ShoppingCart, Zap, RotateCcw, Shield, Truck } from "lucide-react";
import RelatedProdutcs from "../components/RelatedProdutcs";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const featureIcons = [
  { icon: <Check size={14} />, text: "Premium quality fabric" },
  { icon: <Truck size={14} />, text: "Free delivery on orders above ₹499" },
  { icon: <RotateCcw size={14} />, text: "7-day easy return & exchange" },
  { icon: <Shield size={14} />, text: "100% secure payments" },
];

export default function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const found = products.find((p) => p._id === productId);
    if (found) { setProductData(found); setImage(found.image[0]); }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) { toast.warning("Please select a size first!"); return; }
    addToCart(productData._id, size);
    toast.success(`"${productData.name}" added to cart!`);
  };

  const badgeClass =
    productData?.category === "Men" || productData?.category === "Man"
      ? "badge-category badge-men"
      : productData?.category === "Women" || productData?.category === "Woman"
      ? "badge-category badge-women"
      : "badge-category badge-kids";

  const categoryLabel =
    productData?.category === "Man" ? "Men"
    : productData?.category === "Woman" ? "Women"
    : productData?.category;

  if (!productData) return <div className="min-h-screen" />;

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-400 mb-6">
          Home / {categoryLabel} / {productData.subCategory} /{" "}
          <span className="text-gray-700 font-medium">{productData.name}</span>
        </p>

        {/* Main product section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* ── Images ── */}
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 sm:gap-3 order-2 sm:order-1">
              {productData.image.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    image === img ? "border-blue-500 shadow-md" : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 order-1 sm:order-2">
              <div className="relative rounded-2xl overflow-hidden bg-gray-50 shadow-md aspect-[4/5]">
                <img
                  src={image}
                  alt={productData.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                {productData.bestseller && (
                  <span className="absolute top-3 left-3 badge-hot text-xs px-2 py-1">BESTSELLER</span>
                )}
                <span className={`absolute top-3 right-3 ${badgeClass}`}>{categoryLabel}</span>
              </div>
            </div>
          </div>

          {/* ── Product Info ── */}
          <div className="flex-1 max-w-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
              {productData.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(3)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                <StarHalf size={16} fill="currentColor" />
                <Star size={16} className="text-gray-300" fill="currentColor" />
              </div>
              <span className="text-sm text-gray-500 font-medium">4.3 (128 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-5">
              <span className="text-3xl font-extrabold text-blue-600">
                {currency}{productData.price.toLocaleString("en-IN")}
              </span>
              <span className="ml-3 text-sm text-gray-400 line-through">
                {currency}{Math.round(productData.price * 1.25).toLocaleString("en-IN")}
              </span>
              <span className="ml-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                20% OFF
              </span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {productData.description}
            </p>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-800 text-sm">Select Size</p>
                <button className="text-xs text-blue-600 hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                      s === size
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 btn-primary py-3.5 text-sm"
              >
                <ShoppingCart size={17} /> Add to Cart
              </button>
              <button
                onClick={() => {
                  if (!size) { toast.warning("Please select a size first!"); return; }
                  addToCart(productData._id, size);
                  toast.info("Redirecting to checkout…");
                }}
                className="flex-1 flex items-center justify-center gap-2 btn-orange py-3.5 text-sm"
              >
                <Zap size={17} /> Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5 border border-gray-100">
              {featureIcons.map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    {icon}
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Reviews ── */}
        <div className="mt-16">
          <div className="flex border-b border-gray-200 mb-6">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab === "reviews" ? "Reviews (128)" : "Description"}
              </button>
            ))}
          </div>

          <div className="card p-6 text-sm text-gray-600 leading-relaxed">
            {activeTab === "description" ? (
              <p>{productData.description} Crafted with care, this item is designed to deliver lasting comfort and a refined look. The fabric is breathable and easy to maintain, making it a practical yet stylish addition to any wardrobe.</p>
            ) : (
              <div className="space-y-4">
                {[
                  { name: "Rahul S.", rating: 5, text: "Excellent quality! The fabric feels premium and fits perfectly.", date: "12 Jul 2025" },
                  { name: "Priya M.", rating: 4, text: "Great product, very comfortable. Delivery was fast too!", date: "28 Jun 2025" },
                  { name: "Arjun K.", rating: 5, text: "Exactly as described. Will definitely order again.", date: "5 Jun 2025" },
                ].map(({ name, rating, text, date }) => (
                  <div key={name} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-800">{name}</span>
                      <span className="text-xs text-gray-400">{date}</span>
                    </div>
                    <div className="flex text-yellow-400 mb-1">
                      {[...Array(rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        <RelatedProdutcs category={productData.category} subCategory={productData.subCategory} />
      </div>
    </motion.div>
  );
}
