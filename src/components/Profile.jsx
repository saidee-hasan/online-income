import React from "react";
import { FaDownload, FaLock, FaUser, FaWallet, FaMoneyCheckAlt, FaClipboardList, FaChevronRight } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

const menuItems = [
  { icon: <FaClipboardList className="text-blue-500" />, label: "Transaction History" },
  { icon: <FaMoneyCheckAlt className="text-purple-500" />, label: "Withdraw Details" },
  { icon: <FaDownload className="text-pink-500" />, label: "Download APP" },
  { icon: <FaWallet className="text-orange-500" />, label: "My Investments" },
  { icon: <FaLock className="text-red-500" />, label: "Security Settings" },
  { icon: <FaUser className="text-cyan-500" />, label: "Account Profile" },
];

function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans py-10">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MdExitToApp className="text-2xl text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=60"
                alt="Profile"
                className="w-16 h-16 rounded-full border-4 border-white/30"
              />
              <div className="absolute inset-0 ring-2 ring-white/30 rounded-full" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Sarah Anderson</h2>
              <p className="text-sm opacity-90">Premium Member</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Balance: $12,450.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
            <div className="bg-emerald-100 p-3 rounded-full mb-2">
              <FaClipboardList className="text-emerald-600 text-2xl" />
            </div>
            <span className="font-medium text-gray-700">Quick Recharge</span>
            <span className="text-xs text-gray-500">Instant deposit</span>
          </button>
          <button className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
            <div className="bg-purple-100 p-3 rounded-full mb-2">
              <FaMoneyCheckAlt className="text-purple-600 text-2xl" />
            </div>
            <span className="font-medium text-gray-700">Withdraw Funds</span>
            <span className="text-xs text-gray-500">24h processing</span>
          </button>
        </div>

        {/* Menu Items */}
        <div className="mt-8 space-y-2">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-opacity-20">
                  {item.icon}
                </div>
                <span className="font-medium text-gray-700">{item.label}</span>
              </div>
              <FaChevronRight className="text-gray-400 group-hover:text-gray-600" />
            </div>
          ))}
        </div>

        {/* Premium Badge */}
        <div className="mt-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-lg">Premium Club</h3>
              <p className="text-white/90 text-sm mt-1">Unlock exclusive benefits and rewards</p>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <FaWallet className="text-2xl text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;