import React from "react";
import { Headphones, Repeat, ShieldCheck } from'lucide-react'
export default function OurPolicy() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
        <div>
          <Repeat className="w-12 m-auto mb-5" size={40} />
          <p className="font-semibold">Easy Exchange Policy</p>
          <p className="text-gray-400">We offer hassle free exchnage policy</p>
        </div>
        <div>
          <ShieldCheck className="w-12 m-auto mb-5" size={40} />
          <p className="font-semibold">7 Days Return Policy</p>
          <p className="text-gray-400">We Provider 7 Days free return policy</p>
        </div>
        <div>
          <Headphones className="w-12 m-auto mb-5" size={40} />
          <p className="font-semibold">Best customer support</p>
          <p className="text-gray-400">We provider 24/7 customer support</p>
        </div>
      </div>
    </>
  );
}
