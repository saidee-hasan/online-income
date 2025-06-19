import React, { useState, useEffect } from 'react';
import { FaCrown, FaDownload, FaBell, FaUserCircle, FaTimes, FaRegBell, FaArrowDown } from 'react-icons/fa';
import { RiVipCrownFill } from 'react-icons/ri';
import NotificationPanel from '../common/Notifications';

function EliteNavbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [user,setUser]=useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock notifications data
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: "Premium Feature Unlocked",
        message: "You've gained access to exclusive VIP content!",
        time: "2 mins ago",
        read: false,
        premium: true,
        icon: <FaCrown className="text-yellow-400 mr-2" />
      },
      {
        id: 2,
        title: "New Update Available",
        message: "Version 2.5.0 is now available with new features.",
        time: "1 hour ago",
        read: false,
        premium: false,
        icon: <FaDownload className="text-blue-400 mr-2" />
      },
      {
        id: 3,
        title: "Special Offer",
        message: "50% discount on annual VIP subscription!",
        time: "5 hours ago",
        read: false,
        premium: true,
        icon: <FaCrown className="text-yellow-400 mr-2" />
      },
      {
        id: 4,
        title: "Welcome Bonus",
        message: "Claim your 7-day free trial of VIP features.",
        time: "1 day ago",
        read: true,
        premium: true,
        icon: <FaCrown className="text-yellow-400 mr-2" />
      },
      {
        id: 5,
        title: "Exclusive Content Added",
        message: "New premium-only tutorials available in your dashboard.",
        time: "2 days ago",
        read: true,
        premium: true,
        icon: <FaCrown className="text-yellow-400 mr-2" />
      }
    ]);
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadCount > 0) {
      // Mark all as read when opening
      const updatedNotifications = notifications.map(n => ({...n, read: true}));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    }
  };

  const toggleDownloadDropdown = () => {
    setShowDownloadDropdown(!showDownloadDropdown);
  };

  const dismissNotification = (id) => {
    const wasUnread = notifications.find(n => n.id === id && !n.read);
    const updatedNotifications = notifications.filter(n => n.id !== id);
    setNotifications(updatedNotifications);
    if (wasUnread) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const dismissAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const notificationPanel = document.querySelector('.notifications-panel');
      const bellButton = document.querySelector('.bell-button');
      const downloadDropdown = document.querySelector('.download-dropdown');
      const downloadButton = document.querySelector('.download-button');
      
      if (showNotifications && 
          !notificationPanel?.contains(event.target) && 
          !bellButton?.contains(event.target)) {
        setShowNotifications(false);
      }
      
      if (showDownloadDropdown && 
          !downloadDropdown?.contains(event.target) && 
          !downloadButton?.contains(event.target)) {
        setShowDownloadDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showDownloadDropdown]);

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 border-t-4 border-yellow-600 shadow-2xl fixed w-full z-50 p-3 flex justify-between items-center rounded-b-lg transition-all duration-300 backdrop-blur-sm bg-opacity-90">
      {/* Logo with Crown Icon */}
      <div className="flex items-center space-x-2">
        <RiVipCrownFill className="text-yellow-500 text-2xl" />
        <p className="text-yellow-400 font-bold tracking-wider text-xl transform transition duration-300 hover:scale-105 hover:text-yellow-300">
          Online-<span className="text-white">Income</span>
        </p>
      </div>

      {/* Right Side Icons and Button */}
      <div className="flex items-center space-x-4 relative">
        {/* Download Button with Dropdown - Desktop */}
        <div className="hidden sm:block relative">
          <button 
            onClick={toggleDownloadDropdown}
            className="download-button relative group flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
          >
            <FaDownload className="mr-1" />
            <span>Download App</span>
            <FaArrowDown className="ml-1 text-xs opacity-70 group-hover:opacity-100 transition-opacity" />
          </button>
          
          {showDownloadDropdown && (
            <div className="download-dropdown absolute right-0 mt-2 w-56 bg-gray-800 shadow-xl border border-gray-700 rounded-lg overflow-hidden z-50 animate-fadeIn">
              <div className="p-2">
                <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors">
                  <div className="bg-yellow-500 p-2 rounded-full mr-3">
                    <FaCrown className="text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Premium Version</p>
                    <p className="text-xs text-gray-400">Full features, no ads</p>
                  </div>
                </a>
                <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors">
                  <div className="bg-gray-600 p-2 rounded-full mr-3">
                    <FaDownload className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Free Version</p>
                    <p className="text-xs text-gray-400">Basic features</p>
                  </div>
                </a>
              </div>
              <div className="border-t border-gray-700 p-2 bg-gray-900">
                <a href="#" className="block text-center text-sm text-yellow-400 hover:text-yellow-300 p-2 rounded hover:bg-gray-800 transition-colors">
                  View all platforms
                </a>
              </div>
            </div>
          )}
        </div>
        

{
  user?
  
  <div className="">
    {showNotifications && (
  <NotificationPanel
    isMobile={isMobile}
    notifications={notifications}
    dismissNotification={dismissNotification}
    dismissAllNotifications={dismissAllNotifications}
    setShowNotifications={setShowNotifications}
  />
)}<button 
  onClick={toggleNotifications}
  className="relative p-2 text-gray-300 hover:text-yellow-400 transition-colors duration-300 group bell-button"
  aria-label="Notifications"
>
  {unreadCount > 0 ? (
    <FaBell className="text-xl animate-pulse" />
  ) : (
    <FaRegBell className="text-xl" />
  )}
  {unreadCount > 0 && (
    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-yellow-500 flex items-center justify-center text-xs text-black font-bold transform group-hover:scale-110 transition-transform">
      {unreadCount}
    </span>
  )}
</button></div>:""
}





         
        
        {/* User Profile */}
        <button 
          className="p-1 text-gray-300 hover:text-yellow-400 transition-colors duration-300"
          aria-label="User profile"
        >
          <FaUserCircle className="text-2xl" />
        </button>
        
        {/* VIP Button */}
        <button 
          className="hidden sm:flex items-center space-x-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-yellow-500/30 hover:scale-105 transition-all duration-300"
          aria-label="Upgrade to VIP"
        >
          <FaCrown className="mr-1" />
          <span>UPGRADE TO VIP</span>
        </button>
        
        {/* Download Button - Mobile */}
        <button 
          className="sm:hidden flex items-center bg-gradient-to-r from-purple-600 to-blue-500 text-white p-3 rounded-full shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all"
          aria-label="Download"
          onClick={toggleDownloadDropdown}
        >
          <FaDownload />
        </button>
      </div>
    </div>
  );
}

export default EliteNavbar;