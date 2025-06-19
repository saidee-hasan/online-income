// components/notifications/NotificationPanel.jsx
import React from 'react';
import { FaCrown, FaTimes, FaRegBell } from 'react-icons/fa';

const NotificationPanel = ({
  isMobile,
  notifications,
  dismissNotification,
  dismissAllNotifications,
  setShowNotifications
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
<div className={`notifications-panel ${
  isMobile ? 'fixed inset-0 m-0 w-full h-screen rounded-none' :
  'absolute right-0 top-full w-80 rounded-lg'
} bg-gray-800 shadow-xl border border-gray-700 overflow-hidden z-50 animate-fadeIn`}>

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-3 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center">
          <h3 className="font-bold text-yellow-400">Notifications</h3>
          {notifications.some(n => n.premium) && (
            <span className="ml-2 bg-yellow-600 text-black text-xs px-2 py-0.5 rounded-full flex items-center">
              <FaCrown className="mr-1" size={10} />
              VIP
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {!isMobile && (
            <>
              <span className="text-xs text-gray-400">{unreadCount} unread</span>
              {notifications.length > 0 && (
                <button
                  onClick={dismissAllNotifications}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                >
                  Clear all
                </button>
              )}
            </>
          )}
          {isMobile && (
            <button
              onClick={() => setShowNotifications(false)}
              className="text-gray-400 hover:text-white p-1"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className={`${isMobile ? 'h-[calc(100vh-110px)]' : 'max-h-96'} overflow-y-auto`}>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-3 border-b border-gray-700 hover:bg-gray-700 transition-colors ${!notification.read ? 'bg-gray-750' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  {notification.icon}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center mb-1">
                      <h4 className={`font-semibold ${notification.premium ? 'text-yellow-400' : 'text-white'}`}>
                        {notification.title}
                      </h4>
                      {notification.premium && (
                        <span className="ml-2 bg-yellow-600 text-black text-xs px-1.5 py-0.5 rounded-full flex items-center mt-1 sm:mt-0">
                          <FaCrown className="mr-1" size={10} />
                          PREMIUM
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-300">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="text-gray-500 hover:text-red-400 ml-2 transition-colors"
                  aria-label="Dismiss notification"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-400 h-full flex flex-col items-center justify-center">
            <FaRegBell className="mx-auto text-2xl mb-2" />
            <p>No notifications available</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 p-3 border-t border-gray-700">
        {isMobile && notifications.length > 0 && (
          <button
            onClick={dismissAllNotifications}
            className="w-full py-2 mb-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
          >
            Clear All Notifications
          </button>
        )}
        <button className="w-full py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-bold rounded-md transition-all duration-300 flex items-center justify-center">
          <FaCrown className="mr-2" />
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;
