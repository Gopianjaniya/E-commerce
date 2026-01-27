import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { Landmark, Smartphone, Wallet } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
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

export default function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    delivery_fee,
    token,
    getCartAmount,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      // console.log(orderData);

      switch (method) {
        // api call for COD

        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token: localStorage.getItem("token") } }
          );
          // console.log(response.data);

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

          // case'stripe':
          // const responseStripe = await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{token}})
          // if(responseStripe.data.success){
          // const  {session_url} = responseStripe.data
          // window.location.replace(session_url)
          // }else{
          //   toast.error(responseStripe.data.message)
          // }
          // break;
        default:
          break;
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);     
      
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <motion.div variants={item}>
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col sm:flex-row justify-between gap-4 pt-5   sm:pt-14 min-h-[80vh] border-t border-gray-400"
        >
          {/*------------------- left-side  -------------*/}
          <div className="flex flex-col gap-4 w-full sm:max-w-120">
            <div className="text-xl sm:text-2xl my-3">
              <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            </div>
            <div className="flex gap-3">
              <input
                required
                onChange={onChangeHandler}
                name="firstName"
                value={formData.firstName || ""}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="First name"
              />
              <input
                required
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName || ""}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Last name"
              />
            </div>
            <input
              required
              onChange={onChangeHandler}
              name="email"
              value={formData.email || ""}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="email"
              placeholder="Email address"
            />
            <input
              required
              onChange={onChangeHandler}
              name="street"
              value={formData.street || ""}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Street"
            />
            <div className="flex gap-3">
              <input
                required
                onChange={onChangeHandler}
                name="city"
                value={formData.city || ""}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="City name"
              />
              <input
                required
                onChange={onChangeHandler}
                name="state"
                value={formData.state || ""}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="State name"
              />
            </div>
            <div className="flex gap-3">
              <input
                required
                onChange={onChangeHandler}
                name="zipcode"
                value={formData.zipcode || ""}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="number"
                placeholder="Zipcode"
              />
              <input
                required
                onChange={onChangeHandler}
                name="country"
                value={formData.country || ""}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Country"
              />
            </div>
            <input
              required
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone || ""}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="number"
              placeholder="Phone"
            />
          </div>
          {/* --------------------- right-side -------------- */}
          <div className="mt-8">
            <div className="mt-8 min-w-80">
              <CartTotal />
            </div>
            <div className="mt-12 text-sm">
              <Title text1={"PAYMENT"} text2={"METHOD"} />
              {/* --------------- Payment Method Selection ------------------ */}
              <div className="flex gap-3 flex-col lg:grid grid-cols-3 ">
                <div
                  onClick={() => setMethod("stripe")}
                  className="flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-400"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === "stripe" ? "bg-green-500" : ""
                    }`}
                  ></p>
                  <Wallet size={20} />
                  <span>Stripe</span>
                </div>
                <div
                  onClick={() => setMethod("mobile-upi")}
                  className="flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-400"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === "mobile-upi" ? "bg-green-500" : ""
                    }`}
                  ></p>
                  <Smartphone size={20} />
                  <span>Mobile / UPI</span>
                </div>
                <div
                  onClick={() => setMethod("netbanking")}
                  className="flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-400 text-sm"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === "netbanking" ? "bg-green-500" : ""
                    }`}
                  ></p>
                  <Landmark size={20} />
                  <span>Net Banking</span>
                </div>

                <div
                  onClick={() => setMethod("cod")}
                  className="flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-400 text-sm"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === "cod" ? "bg-green-500" : ""
                    }`}
                  ></p>
                  CASH ON DELIVERY
                </div>
              </div>
              <div className="w-full text-end mt-8">
                <button
                  type="submit"
                  className="bg-black  text-white px-16 py-3 text-sm"
                >
                  PLACE OREDER
                </button>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
