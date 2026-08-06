import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import CartTotal from "../components/CartTotal";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const temp = [];
      for (const id in cartItems) {
        for (const size in cartItems[id]) {
          if (cartItems[id][size] > 0) temp.push({ _id: id, size, qty: cartItems[id][size] });
        }
      }
      setCartData(temp);
    }
  }, [cartItems, products]);

  const handleRemove = (id, size) => {
    updateQuantity(id, size, 0);
    toast.info("Item removed from cart");
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <Title text1="YOUR" text2="CART" />
        </div>

        {cartData.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={56} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">Your cart is empty</h3>
            <p className="text-gray-400 text-sm mb-6">Looks like you haven't added anything yet.</p>
            <button onClick={() => navigate("/collection")} className="btn-primary">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
            {/* Items */}
            <div className="space-y-4">
              {cartData.map((item) => {
                const product = products.find((p) => p._id === item._id);
                if (!product) return null;
                return (
                  <div key={`${item._id}-${item.size}`} className="card p-4 flex items-center gap-4">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                        {product.name}
                      </p>
                      <p className="text-blue-600 font-bold text-base mt-0.5">
                        {currency}{product.price.toLocaleString("en-IN")}
                      </p>
                      <span className="inline-block mt-1 text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-lg border border-gray-200">
                        Size: {item.size}
                      </span>
                      <div className="flex items-center gap-3 mt-3">
                        <label className="text-xs text-gray-500 font-medium">Qty:</label>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => item.qty > 1 && updateQuantity(item._id, item.size, item.qty - 1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                          >−</button>
                          <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.size, item.qty + 1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                          >+</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <p className="font-bold text-gray-800 text-sm">
                        {currency}{(product.price * item.qty).toLocaleString("en-IN")}
                      </p>
                      <button
                        onClick={() => handleRemove(item._id, item.size)}
                        className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <CartTotal />
              <button
                onClick={() => navigate("/place-order")}
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/collection")}
                className="btn-outline w-full py-3 text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
