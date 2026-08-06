import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

export default function RelatedProdutcs({ category, subCategory }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let copy = products.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );
      setRelated(copy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  if (!related.length) return null;

  return (
    <section className="mt-20 mb-10">
      <div className="text-center mb-8">
        <Title text1="YOU MAY" text2="ALSO LIKE" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            price={item.price}
            name={item.name}
            category={item.category}
            bestseller={item.bestseller}
          />
        ))}
      </div>
    </section>
  );
}
