import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto mt-2 leading-relaxed">
          Discover the newest arrivals in fashion — from everyday casual wear to
          sharp formal styles, designed for comfort and modern trends.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            category={item.category}
            bestseller={item.bestseller}
          />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/collection" className="btn-outline inline-flex items-center gap-2">
          View All Products <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
