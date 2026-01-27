import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
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
export default function Orders() {
  const { products, currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } },
      );
      console.log(response.data.order);

      if (response.data.success) {
        let allOrderItem = [];
        response.data.order.map((orders) => {
          orders.items.map((item) => {
            item["status"] = orders.status;
            item["payment"] = orders.payment;
            item["paymentMethod"] = orders.paymentMethod;
            item["date"] = orders.date;
            allOrderItem.push(item);
          });
        });
        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <motion.div variants={item}>
        <div className="border-t border-gray-400 pt-16">
          <div className="text-2xl">
            <Title text1={"MY"} text2={"ORDERS"} />
          </div>
          <div>
            {orderData.map((item, index) => (
              <div
                key={index}
                className="py-4 border-t border-b border-gray-400 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6 text-sm">
                  <div className="w-25 h-25 overflow-hidden border-2 border-gray-300">
                    <img
                      className="object-center object-cover w-full h-full rounded p-1"
                      src={item.image[0]}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                      <p>
                        {currency}
                        {item.price}
                      </p>
                      <p>Qyantity :{item.quantity}</p>
                      <p>Size : {item.size}</p>
                    </div>
                    <p className="mt-1">
                      Date :{" "}
                      <span className="text-gray-400">
                        {new Date(item.date).toDateString()}
                      </span>
                    </p>
                    <p className="mt-1">
                      Payment :{" "}
                      <span className="text-gray-400">
                        {item.paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between ">
                  <div className="flex items-center gap-2 ">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
