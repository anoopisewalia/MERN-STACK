import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between py-3 px-[4%] bg-white border-b border-gray-300 shadow-sm">
      {/* Left Side: Title - Forced to single line with whitespace control */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 whitespace-nowrap">
        Admin Panel
      </h1>

      {/* Right Side: Logout Button */}
      <button
        onClick={() => setToken("")}
        className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition duration-200 shadow-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;