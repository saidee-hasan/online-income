import React from 'react';

function Navbar() {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 border-t-4 border-gray-600 shadow-2xl fixed w-full z-50 p-2  flex justify-between items-center shadow-2xl rounded-b-lg transition-all duration-300">
      {/* Logo or Title */}
      <p className="text-white  tracking-widest transform transition duration-300 hover:scale-110">
        Premium Navbar
      </p>

      {/* Button */}
      <button className="bg-white text-indigo-700 px-8 sm:px-6 md:px-10 py-2 rounded-full font-semibold shadow-2xl hover:bg-indigo-200 hover:text-indigo-800 hover:scale-110 transition-all duration-300 ease-in-out transform">
        Download
      </button>
    </div>
  );
}

export default Navbar;
