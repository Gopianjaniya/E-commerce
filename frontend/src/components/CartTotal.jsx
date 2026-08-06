import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export default function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
      <h3 className="font-bold text-gray-800 text-base mb-4 pb-3 border-b border-gray-100">
        Order Summary
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-800">
            {currency}{subtotal.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span className={`font-medium ${subtotal === 0 ? "text-gray-400" : "text-gray-800"}`}>
            {subtotal === 0 ? "—" : `${currency}${delivery_fee}`}
          </span>
        </div>
        <div className="h-px bg-gray-100 my-1" />
        <div className="flex justify-between">
          <span className="font-bold text-gray-800">Total</span>
          <span className="font-bold text-blue-600 text-base">
            {currency}{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
      {subtotal > 0 && (
        <p className="text-[11px] text-gray-400 mt-3">
          * Taxes included. Free delivery on orders above ₹499.
        </p>
      )}
    </div>
  );
}
