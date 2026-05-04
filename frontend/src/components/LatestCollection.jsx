  import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

export default function LatestCollection() {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <>
      <div className="my-10">
        <div className=" text-center py-8 text-lg sm:text-3xl">
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <p className="sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Discover the newest arrivals in men’s fashion. From everyday casual
            wear to sharp formal styles, our latest collection is designed for
            comfort, confidence, and modern trends. Upgrade your wardrobe with
            pieces that fit perfectly and stand out effortlessly.
          </p>
        </div>
        {/* Rendring Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
          {latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </>
  );
}
