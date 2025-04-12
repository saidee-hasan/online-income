import React from 'react';
import { FaCrown, FaDownload, FaBell, FaUserCircle } from 'react-icons/fa';
import { RiVipCrownFill } from 'react-icons/ri';

function Navbar() {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 border-t-4 border-yellow-600 shadow-2xl fixed w-full z-50 p-3 flex justify-between items-center rounded-b-lg transition-all duration-300 backdrop-blur-sm bg-opacity-90">
      {/* Logo with Crown Icon */}
      <div className="flex items-center space-x-2">
        <RiVipCrownFill className="text-yellow-500 text-2xl" />
        <p className="text-yellow-400 font-bold tracking-wider text-xl transform transition duration-300 hover:scale-105 hover:text-yellow-300">
          ELITE<span className="text-white">NAV</span>
        </p>
      </div>

 

      {/* Right Side Icons and Button */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-300 hover:text-yellow-400 transition-colors duration-300">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-500"></span>
        </button>
        
        {/* User Profile */}
        <button className="p-1 text-gray-300 hover:text-yellow-400 transition-colors duration-300">
          <FaUserCircle className="text-2xl" />
        </button>
        
        {/* VIP Button */}
        <button className="hidden sm:flex items-center space-x-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-yellow-500/30 hover:scale-105 transition-all duration-300">
          <FaCrown className="mr-1" />
          <span>VIP</span>
        </button>
        
        {/* Download Button - Mobile */}
        <button className="sm:hidden flex items-center bg-gradient-to-r from-yellow-600 to-yellow-700 text-black p-2 rounded-full shadow-lg">
          <FaDownload />
        </button>
      </div>
    </div>
  );
}

export default Navbar;