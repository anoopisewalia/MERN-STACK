import React from "react";
import { assets } from "../assets/frontend_assets/assets";

function Footer() {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-14 text-sm">
        <div className="">
         

          <p className="w-full md:w-2/3  text-gray-600">
          <strong className="text-gray-900">E-commerce</strong>  was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
        </div>

        

        <div>
          <p className="text-xl font-medium mb-5"> GET IN TOUCH</p>
          <ul className="flex flex-col  gap-1 text-gray-600">
            <li>+91 99146-08994</li>
            <li>contact@ecommerce.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ecommerce.com - All Rights Reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
