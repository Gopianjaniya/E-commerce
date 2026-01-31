import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Star, StarHalf } from "lucide-react";
import RelatedProdutcs from "../components/RelatedProdutcs";
import { motion } from "framer-motion";
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // pehle 0.2 tha
    },
  },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, // duration badha di
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        // console.log(item.image[0], "...................");

        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);
  return productData ? (
    <motion.div variants={container} initial="hidden" animate="visible">
      <motion.div variants={item}>
        <div className=" border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 border-gray-400">
          {/* ------------------- Product Data */}
          <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
            {/*  ------------------------ product images */}
            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
              <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                {productData?.image?.map((item, index) => (
                  <img
                    onClick={() => {
                      setImage(item);
                    }}
                    src={item}
                    key={index}
                    className="w-[24%] h-20 sm:h-28 sm:w-full sm:mb-3 shrink-0 cursor-pointer object-center object-cover "
                    alt=""
                  />
                ))}
              </div>
              <div className="w-full h-80 sm:w-[80%] sm:h-120">
                <img
                  className="w-full h-full object-cover object-center
              "
                  src={image}
                  alt=""
                />
              </div>
            </div>
            {/* =========== product info */}
            <div className="flex-1">
              <h1 className="font-medium text-sm sm:text-2xl mt-2">
                {productData.name}
              </h1>
              <div className="flex items-center gap-1 mt-2">
                <Star
                  className="text-yellow-500 fill-yellow-500 w-3.5"
                  size={20}
                />
                <Star
                  className="text-yellow-500 fill-yellow-500 w-3.5"
                  size={20}
                />
                <Star
                  className="text-yellow-500 fill-yellow-500 w-3.5"
                  size={20}
                />
                <StarHalf
                  className="text-yellow-500 fill-yellow-500 w-3.5"
                  size={20}
                />
                <Star className="text-yellow-500 w-3.5" size={20} />
                <p className="pl-2">(122)</p>
              </div>
              <p className="mt-5 text-sm sm:text-3xl font-medium">
                {currency}
                {productData.price}
              </p>
              <p className="mt-5 text-gray-500 md:w-4/5 text-xs sm:text-base">
                {productData.description}
              </p>
              <div className="flex flex-col gap-4 my-8">
                <p>Select Size</p>

                <div className="flex gap-2">
                  {productData.sizes.map((item, index) => (
                    <button
                      onClick={() => setSize(item)}
                      className={`py-2 px-4 bg-gray-100 ${
                        item === size ? "border border-orange-900" : ""
                      }`}
                      key={index}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => addToCart(productData._id, size)}
                className="bg-black text-white px-8 py-3 text-xs sm:text-sm active:bg-gray-700 rounded"
              >
                ADD TO CART
              </button>
              <hr className="mt-5 sm:mt-8 sm:w-4/5 border-gray-400" />
              <div className="text-xs sm:text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% Original product.</p>
                <p>Cash om delivery is availlable on this product</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
          </div>
          {/* ---------------- Description & Review Section ------------------------ */}
          <div className="mt-20">
            <div className="flex">
              <b className="w-[50%] border px-5 py-3 text-xs sm:text-sm border-gray-400 ">
                Description
              </b>
              <p className="w-[50%] border px-5 py-3 text-xs sm:text-sm   border-gray-400">
                Reviews (122)
              </p>
            </div>
            <div className="flex flex-col gap-4 border px-6 py-6 text-xs sm:text-sm text-gray-500">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ea
                veritatis aperiam, laborum ut et eaque magni tempora corporis,
                debitis modi dolorem similique repellendus nam. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Iure ea veritatis
                aperiam, laborum ut et eaque magni tempora corporis, debitis
                modi dolorem similique repellendus nam.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ea
                veritatis aperiam, laborum ut et eaque magni tempora corporis,
                debitis modi dolorem similique repellendus nam.
              </p>
            </div>
          </div>
          {/*---------------------- display related products------------------ */}
          <div>
            <RelatedProdutcs
              category={productData.category}
              subCategory={productData.subCategory}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  ) : (
    <div className="opacity-0"></div>
  );
}
