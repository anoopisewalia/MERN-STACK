import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItem,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
    navigate("/login");
  };

  return (
    <>
      <div className="relative flex items-center justify-between py-5 font-medium">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <p className="text-4xl font-light text-gray-800 tracking-wider">
            ECOMMERCE<span className="text-gray-800">.</span>
          </p>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-10 text-sm text-gray-700 uppercase">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>Home</p>
            <hr className="w-8 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition" />
          </NavLink>

          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>Collection</p>
            <hr className="w-8 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition" />
          </NavLink>

          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>About</p>
            <hr className="w-8 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition" />
          </NavLink>

          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>Contact</p>
            <hr className="w-8 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition" />
          </NavLink>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            alt="Search"
            className="w-5 cursor-pointer hover:opacity-70 transition"
          />

          {/* Profile Dropdown */}
          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              className="w-5 cursor-pointer hover:opacity-70 transition"
              alt="Profile"
            />

            {/* Dropdown Menu - Only show if logged in */}
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
                <div className="flex flex-col gap-3 w-40 py-4 px-6 bg-white border border-gray-200 rounded-lg shadow-xl text-gray-700">
                  <p
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer hover:text-black font-medium"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    My Orders
                  </p>
                  <hr className="border-gray-300" />
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-red-600 font-medium"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              className="w-5 min-w-5 hover:opacity-70 transition"
              alt="Cart"
            />
            <p className="absolute right-[-8px] bottom-[-8px] w-5 h-5 text-center leading-5 bg-black text-white rounded-full text-[10px] font-medium">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu Toggle */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-500 z-50 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer border-b"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Back" />
            <p className="font-medium">Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-8 border-b uppercase font-medium"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-8 border-b uppercase font-medium"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-8 border-b uppercase font-medium"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-8 border-b uppercase font-medium"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Navbar;