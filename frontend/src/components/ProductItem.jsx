import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export default function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  return (
    <>
      <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer ">
        <div className="overflow-hidden ">
          <img
            className="hover:scale-110 transition ease-in-out w-60 h-50 object-center object-cover"
            src={image[0]}
            alt=""
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
    </>
  );
}
