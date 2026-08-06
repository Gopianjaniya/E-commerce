import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Men", "Women", "Kids"];
const subCategories = ["Topwear", "Bottomwear", "Winterwear"];
const sortOptions = [
  { value: "relevant", label: "Most Relevant" },
  { value: "low-high", label: "Price: Low → High" },
  { value: "high-low", label: "Price: High → Low" },
];

export default function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggle = (arr, setArr, val) => {
    setArr((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const applyFilter = () => {
    let copy = [...products];
    if (showSearch && search)
      copy = copy.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    if (category.length)
      copy = copy.filter((p) => {
        const cat = p.category;
        return category.some((c) => {
          if (c === "Men")   return cat === "Men"   || cat === "Man";
          if (c === "Women") return cat === "Women" || cat === "Woman";
          return cat === c;
        });
      });
    if (subCategory.length) copy = copy.filter((p) => subCategory.includes(p.subCategory));
    setFilterProducts(copy);
  };

  useEffect(() => { applyFilter(); }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    const copy = [...filterProducts];
    if (sortType === "low-high") copy.sort((a, b) => a.price - b.price);
    else if (sortType === "high-low") copy.sort((a, b) => b.price - a.price);
    else applyFilter();
    if (sortType !== "relevant") setFilterProducts(copy);
  }, [sortType]);

  const clearFilters = () => { setCategory([]); setSubCategory([]); };
  const activeFilterCount = category.length + subCategory.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title text1="ALL" text2="COLLECTION" />
          <p className="text-sm text-gray-400 mt-0.5">{filterProducts.length} products</p>
        </div>
        {/* Sort + mobile filter toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`md:hidden flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
              activeFilterCount
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            <SlidersHorizontal size={15} />
            Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <div className="relative">
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-gray-200 text-sm font-medium bg-white text-gray-700 focus:outline-none focus:border-blue-400 cursor-pointer shadow-sm"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* ── Sidebar filter ── */}
        <aside
          className={`${
            showFilter ? "block" : "hidden"
          } md:block w-full md:w-56 flex-shrink-0`}
        >
          <div className="card p-5 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-gray-800 text-sm">Filters</p>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  <X size={12} /> Clear all
                </button>
              )}
            </div>

            {/* Category */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Category</p>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={category.includes(cat)}
                      onChange={() => toggle(category, setCategory, cat)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className={`text-sm transition-colors ${category.includes(cat) ? "text-blue-600 font-semibold" : "text-gray-600 group-hover:text-gray-800"}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100 mb-5" />

            {/* Sub-category */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Type</p>
              <div className="space-y-2">
                {subCategories.map((sub) => (
                  <label key={sub} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={subCategory.includes(sub)}
                      onChange={() => toggle(subCategory, setSubCategory, sub)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className={`text-sm transition-colors ${subCategory.includes(sub) ? "text-blue-600 font-semibold" : "text-gray-600 group-hover:text-gray-800"}`}>
                      {sub}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Product grid ── */}
        <div className="flex-1 min-w-0">
          {filterProducts.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <SlidersHorizontal size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-medium text-gray-500">No products match your filters.</p>
              <button onClick={clearFilters} className="btn-primary mt-4 text-sm">
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
            >
              <AnimatePresence>
                {filterProducts.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductItem
                      id={item._id}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      category={item.category}
                      bestseller={item.bestseller}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
