import React from "react";
import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-25 h-16" sizes={10} />
          <p className="w-full md:w-2/3 text-gray-600 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perferendis, repudiandae aliquid omnis officiis placeat nam impedit
            eum dicta architecto tempora!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-235-733-4576</li>
            <li>constct@foreveryou.com</li>
          </ul>
        </div>
      </div>
        <div>
            <hr className="text-gray-400"/>
            <p className="py-5 text-sm text-center text-gray-700"> Copyright2025@ forever.com - All Right Reserved.</p>
        </div>
    </>
  );
}
