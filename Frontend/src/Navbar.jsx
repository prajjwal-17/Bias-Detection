import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaChartBar, FaDiagnoses, FaMoneyBill, FaStar } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-center p-2 sticky top-2 z-10 ">
      <nav className="w-[95%]">
        {/* Main Navbar */}
        <div className="bg-[#76BA9D] flex items-center justify-between px-10 py-2 rounded-[10px] shadow-md">
          
          {/* Left: Logo & Menu Button */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg">
              <img src="/LogoN.png" alt="Logo" className="w-[50px]" />
            </button>
            <button
              className="text-[#FCF5E5] text-2xl md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Center: Navigation Links (Visible on Desktop) */}
          <div className="hidden md:flex gap-6 font-medium text-[#FCF5E5] font-mono-Roboto">
            <NavLink to="/" className="hover:text-black cursor-pointer flex items-center gap-1">
              <FaHome /> HOME
            </NavLink>
            <NavLink to="/bias-detection" className="hover:text-black cursor-pointer flex items-center gap-1">
              <FaMoneyBill /> Income Bias
            </NavLink>
            <NavLink to="/usp" className="hover:text-black cursor-pointer flex items-center gap-1">
              <FaStar /> USP
            </NavLink>
            <NavLink to="/bias-analysis" className="hover:text-black cursor-pointer flex items-center gap-1">
              <FaDiagnoses /> Crime Bias
            </NavLink>
            <NavLink to="/stats" className="hover:text-black cursor-pointer flex items-center gap-1">
              <FaChartBar /> Stats
            </NavLink>
          </div>

          {/* Right: About Us Button (Now a NavLink) */}
          <div className="hidden md:flex items-center font-mono-Roboto">
            <NavLink
              to="/about-us"
              className="px-4 py-2 rounded-lg border border-[#FCF5E5] hover:border-[#76BA9D] text-[#FCF5E5] hover:text-[#76BA9D] tracking-tighter hover:bg-red-100"
            >
              Get To Know Us
            </NavLink>
          </div>
        </div>

        {/* Mobile Menu (Visible when Open) */}
        {menuOpen && (
          <div className="md:hidden bg-[#76BA9D] flex flex-col items-center gap-4 py-4 rounded-[10px] mt-2 shadow-md">
            <NavLink to="/" className="hover:text-black cursor-pointer flex items-center gap-1">
              <FaHome /> HOME
            </NavLink>
            <NavLink to="/bias-detection" className="hover:text-black cursor-pointer flex items-center gap-1">
              <FaMoneyBill /> Income Bias
            </NavLink>
            <NavLink to="/usp" className="hover:text-black cursor-pointer flex items-center gap-1">
              <FaStar /> USP
            </NavLink>
            <NavLink to="/bias-analysis" className="hover:text-black cursor-pointer flex items-center gap-1">
              <FaDiagnoses /> Crime Bias
            </NavLink>
            <NavLink to="/stats" className="hover:text-black cursor-pointer flex items-center gap-1">
              <FaChartBar /> Stats
            </NavLink>
            <NavLink
              to="/about-us"
              className="px-4 py-2 rounded-lg border border-[#FCF5E5] hover:border-[#76BA9D] text-[#FCF5E5] hover:text-[#76BA9D] tracking-tighter hover:bg-red-100"
            >
              Get To Know Us
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}
