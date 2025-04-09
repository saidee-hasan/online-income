import React from 'react';

function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 border-t-2 border-gray-600 shadow-lg rounded-t-xl">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium text-white">
        <a href="/" className="inline-flex flex-col items-center justify-center px-5 py-2 hover:bg-gray-700 rounded-lg group cursor-pointer transition duration-300">
          <svg className="w-6 h-6 mb-1 text-blue-500 group-hover:text-blue-400 transform group-hover:scale-110 transition duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <span className="text-sm group-hover:text-blue-400">Home</span>
        </a>

        <a href="/vip" className="inline-flex flex-col items-center justify-center px-5 py-2 hover:bg-gray-700 rounded-lg group cursor-pointer transition duration-300">
          <svg className="w-6 h-6 mb-1 text-yellow-400 group-hover:text-yellow-300 transform group-hover:scale-110 transition duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
            <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>
          <span className="text-sm group-hover:text-yellow-300">VIP</span>
        </a>

        <a href="/team" className="inline-flex flex-col items-center justify-center px-5 py-2 hover:bg-gray-700 rounded-lg group cursor-pointer transition duration-300">
          <svg className="w-6 h-6 mb-1 text-green-500 group-hover:text-green-400 transform group-hover:scale-110 transition duration-300" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
          </svg>
          <span className="text-sm group-hover:text-green-400">Team</span>
        </a>

        <a href="/profile" className="inline-flex flex-col items-center justify-center px-5 py-2 hover:bg-gray-700 rounded-lg group cursor-pointer transition duration-300">
          <svg className="w-6 h-6 mb-1 text-orange-500 group-hover:text-orange-400 transform group-hover:scale-110 transition duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <span className="text-sm group-hover:text-orange-400">Profile</span>
        </a>
      </div>
    </div>
  );
}

export default BottomNavigation;
