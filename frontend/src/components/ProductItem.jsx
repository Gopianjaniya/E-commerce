import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Eye } from "lucide-react";

export default function ProductItem({ id, image, name, price, category, bestseller }) {
  const { currency } = useContext(ShopContext);

  const badgeClass =
    category === "Men" || category === "Man"
      ? "badge-category badge-men"
      : category === "Women" || category === "Woman"
      ? "badge-category badge-women"
      : "badge-category badge-kids";

  const categoryLabel =
    category === "Man" ? "Men" : category === "Woman" ? "Women" : category;

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="product-card group h-full">
        {/* Image */}
        <div className="product-img relative aspect-[3/4] bg-gray-50">
          <img
            className="w-full h-full object-cover object-center"
            src={image[0]}
            alt={name}
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {bestseller && <span className="badge-hot">HOT</span>}
            {categoryLabel && (
              <span className={badgeClass}>{categoryLabel}</span>
            )}
          </div>

          {/* Quick-view overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 bg-white/95 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye size={13} />
              Quick View
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 mb-1">
            {name}
          </p>
          <p className="text-base font-bold text-blue-600">
            {currency}{price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </Link>
  );
}
