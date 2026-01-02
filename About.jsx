import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT "} text2={"US"} />
      </div>

      <div className="mt-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col gap-6 justify-center md:w-1/2 text-gray-600">
          <p>
            E-commerce was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
           Since we started, we have worked very hard to bring together a wide range of good-quality products that suit everyone’s likes and needs. From fashion and beauty items to electronics and home-use products, we offer a large collection that comes from trusted brands and suppliers.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8  sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance : </b>
          <p className="text-gray-600">
           We carefully choose and check every product to make sure it meets our high-quality standards.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8  sm:py-20 flex flex-col gap-5">
          <b>Convenience : </b>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8  sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service : </b>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
