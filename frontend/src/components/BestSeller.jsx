import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Flame } from "lucide-react";

export default function BestSeller() {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/60 to-orange-50/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 border border-orange-100">
            <Flame size={14} />
            TRENDING NOW
          </div>
          <Title text1="BEST" text2="SELLERS" />
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Our best-selling styles loved by thousands of customers — combining
            quality fabric, modern design, and unbeatable comfort.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {bestSeller.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              category={item.category}
              bestseller={item.bestseller}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
