import React, { useState, useEffect } from 'react';
import { FaGooglePlay, FaCoins, FaGem, FaCrown, FaChartLine, FaUserTie, FaShareAlt, FaSyncAlt } from 'react-icons/fa';
import { MdSecurity, MdPhoneIphone, MdAttachMoney, MdTimer, MdPublic } from 'react-icons/md';
import { RiCouponLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const AppInstallIncome = () => {
  const [activeTab, setActiveTab] = useState('earn');
  const [isPremium, setIsPremium] = useState(false);
  const [balance, setBalance] = useState(12.75);
  const [dailyApps, setDailyApps] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalInstalls, setTotalInstalls] = useState(0);
  const [userCountry, setUserCountry] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Get random color for app cards
  const getRandomColor = () => {
    const colors = [
      'bg-gradient-to-br from-red-500 to-red-700',
      'bg-gradient-to-br from-blue-500 to-blue-700',
      'bg-gradient-to-br from-green-500 to-green-700',
      'bg-gradient-to-br from-yellow-500 to-yellow-700',
      'bg-gradient-to-br from-purple-500 to-purple-700'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Get appropriate icon based on offer type
  const getOfferIcon = (type) => {
    switch(type) {
      case 'Pin-Submit': return '📱';
      case 'Download': return '⬇️';
      case 'Survey': return '📝';
      case 'Signup': return '✍️';
      default: return '💰';
    }
  };

  // Generate demo apps for fallback
  const generateDemoApps = () => {
    const appCategories = [
      { name: "Games", icon: "🎮", color: "bg-gradient-to-br from-red-500 to-red-700" },
      { name: "Social", icon: "💬", color: "bg-gradient-to-br from-blue-500 to-blue-700" },
      { name: "Shopping", icon: "🛍️", color: "bg-gradient-to-br from-green-500 to-green-700" },
      { name: "Finance", icon: "💰", color: "bg-gradient-to-br from-yellow-500 to-yellow-700" },
      { name: "Health", icon: "🏥", color: "bg-gradient-to-br from-purple-500 to-purple-700" },
    ];

    const generatedApps = Array.from({ length: 20 }, (_, i) => {
      const category = appCategories[Math.floor(Math.random() * appCategories.length)];
      const reward = (Math.random() * 3 + 0.5).toFixed(2);
      return {
        id: i + 1,
        name: `${category.name} App ${i + 1}`,
        description: `Install this ${category.name.toLowerCase()} app to earn money`,
        icon: category.icon,
        category: category.name,
        type: ['Download', 'Pin-Submit', 'Survey', 'Signup'][Math.floor(Math.random() * 4)],
        reward: parseFloat(reward),
        color: category.color,
        installed: false,
        premiumOnly: Math.random() > 0.7,
        offerLink: "#",
        image: null
      };
    });

    setDailyApps(generatedApps);
    setTimeLeft(Math.floor(Math.random() * 24 * 60 * 60));
    setLastUpdated(new Date());
  };

  // Fetch offers from CPAGrip API
  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        'https://www.cpagrip.com/common/offer_feed_json.php?user_id=2377100&pubkey=887afdb0a389da4880e9c224e725041d&tracking_id='
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.offers || data.offers.length === 0) {
        throw new Error('No offers available in the response');
      }

      // Extract country from response if available
      if (data.general) {
        const countryData = data.general.find(item => item.country_code);
        if (countryData) {
          setUserCountry(countryData.country_code);
        }
      }

      const formattedOffers = data.offers.map((offer, index) => ({
        id: offer.offer_id || index,
        name: offer.title,
        description: offer.description,
        icon: getOfferIcon(offer.type || 'General'),
        category: offer.category || 'General',
        type: offer.type || 'General',
        reward: parseFloat(offer.payout) || 0.5,
        color: getRandomColor(),
        installed: false,
        premiumOnly: Math.random() > 0.7,
        offerLink: offer.offerlink,
        image: offer.offerphoto
      }));
      
      setDailyApps(formattedOffers);
      setTimeLeft(Math.floor(Math.random() * 24 * 60 * 60));
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching offers:', err);
      setError(err.message);
      generateDemoApps();
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Initial fetch
  useEffect(() => {
    fetchOffers();
  }, []);

  const installApp = (appId) => {
    setDailyApps(prevApps =>
      prevApps.map(app =>
        app.id === appId 
          ? { ...app, installed: true }
          : app
      )
    );
    
    const app = dailyApps.find(a => a.id === appId);
    const reward = isPremium ? app.reward * 2 : app.reward;
    setBalance(prev => prev + reward);
    setTotalInstalls(prev => prev + 1);
    
    if (app.offerLink && app.offerLink !== '#') {
      window.open(app.offerLink, '_blank');
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
  };

  const upgradeToPremium = () => {
    setIsPremium(true);
    // In a real app, you would handle payment processing here
  };

  const refreshOffers = () => {
    fetchOffers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center gap-2 mb-4"
        >
          <FaCoins className="text-yellow-400 text-3xl" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
            App Install Rewards
          </h1>
        </motion.div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Install apps and earn money instantly. Premium members earn 2x rewards!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
        {/* Balance Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Your Balance</p>
              <p className="text-2xl font-bold text-yellow-400">${balance.toFixed(2)}</p>
            </div>
            <div className="bg-yellow-500 bg-opacity-20 p-3 rounded-full">
              <MdAttachMoney className="text-yellow-400 text-2xl" />
            </div>
          </div>
          <button className="mt-3 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium py-2 rounded-lg hover:opacity-90 transition">
            Withdraw
          </button>
        </motion.div>

        {/* Premium Status Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={`rounded-xl p-4 border shadow-lg ${isPremium ? 'bg-gradient-to-br from-purple-800 to-purple-900 border-purple-600' : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Membership</p>
              <p className="text-xl font-bold">
                {isPremium ? (
                  <span className="text-purple-300">Premium <span className="text-xs bg-purple-600 px-2 py-1 rounded-full ml-1">ACTIVE</span></span>
                ) : (
                  <span className="text-gray-300">Basic</span>
                )}
              </p>
            </div>
            <div className={`p-3 rounded-full ${isPremium ? 'bg-purple-500 bg-opacity-20' : 'bg-gray-600 bg-opacity-20'}`}>
              <FaCrown className={`text-2xl ${isPremium ? 'text-purple-400' : 'text-gray-400'}`} />
            </div>
          </div>
          <button 
            onClick={upgradeToPremium}
            className={`mt-3 w-full font-medium py-2 rounded-lg transition ${isPremium ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90'}`}
            disabled={isPremium}
          >
            {isPremium ? 'Premium Active' : 'Upgrade to Premium'}
          </button>
        </motion.div>

        {/* Stats Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Installs</p>
              <p className="text-2xl font-bold">{totalInstalls}</p>
              {userCountry && (
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                  <MdPublic /> {userCountry}
                </div>
              )}
            </div>
            <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full">
              <MdPhoneIphone className="text-blue-400 text-2xl" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-400 text-sm">Earnings Multiplier</p>
            <p className="text-lg font-bold">
              {isPremium ? (
                <span className="text-green-400">2.0x <span className="text-xs bg-green-600 px-2 py-1 rounded-full ml-1">PREMIUM</span></span>
              ) : (
                <span className="text-gray-300">1.0x</span>
              )}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main App Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gray-800 rounded-2xl p-1 max-w-4xl mx-auto shadow-2xl border border-gray-700 overflow-hidden"
      >
        {/* Premium Ribbon */}
        {isPremium && (
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-center py-1 text-xs font-bold text-white flex items-center justify-center gap-2">
            <FaCrown className="text-yellow-300" />
            <span>PREMIUM MEMBER - EARNING 2X REWARDS</span>
            <FaCrown className="text-yellow-300" />
          </div>
        )}
        
        <div className="bg-gray-900 rounded-xl p-1">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('earn')}
              className={`flex-1 py-3 font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'earn' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              <FaGooglePlay /> Earn
            </button>
            <button
              onClick={() => setActiveTab('referrals')}
              className={`flex-1 py-3 font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'referrals' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              <FaShareAlt /> Referrals
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-3 font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'stats' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              <FaChartLine /> Stats
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'earn' && (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                <div className="flex justify-between items-center mb-2">
                  {lastUpdated && (
                    <p className="text-xs text-gray-500">
                      Last updated: {formatDate(lastUpdated)}
                    </p>
                  )}
                  <button 
                    onClick={refreshOffers}
                    className="text-xs flex items-center gap-1 text-gray-400 hover:text-gray-300"
                  >
                    <FaSyncAlt className={loading ? 'animate-spin' : ''} /> Refresh
                  </button>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-400"></div>
                  </div>
                ) : error ? (
                  <div className="bg-red-900 bg-opacity-30 p-4 rounded-lg text-center">
                    <p>Error loading offers: {error}</p>
                    <p className="text-sm text-gray-300 mt-1">Showing demo apps instead</p>
                  </div>
                ) : (
                  <>
                    {timeLeft > 0 && (
                      <div className="bg-blue-900 bg-opacity-30 p-3 rounded-lg flex items-center gap-3 text-sm border border-blue-800">
                        <MdTimer className="text-blue-400 text-xl" />
                        <div>
                          <h3 className="font-medium">New apps in:</h3>
                          <p className="text-blue-300">{formatTime(timeLeft)}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {dailyApps.map((app) => (
                        <motion.div 
                          key={app.id}
                          whileHover={{ scale: 1.01 }}
                          className={`bg-gray-800 p-3 rounded-lg flex items-center gap-3 border ${app.premiumOnly ? 'border-purple-800' : 'border-gray-700'} ${app.premiumOnly && !isPremium ? 'opacity-70' : ''}`}
                        >
                          {app.image ? (
                            <img 
                              src={app.image} 
                              alt={app.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className={`${app.color} p-3 rounded-lg flex items-center justify-center`}>
                              <span className="text-2xl">{app.icon}</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{app.name}</h3>
                            <div className="flex justify-between text-xs text-gray-400">
                              <span className="truncate">{app.description || app.category}</span>
                              <span className="font-bold">
                                {isPremium ? (
                                  <>
                                    <span className="text-gray-400 line-through text-xs mr-1">${app.reward.toFixed(2)}</span>
                                    <span className="text-yellow-300">${(app.reward * 2).toFixed(2)}</span>
                                  </>
                                ) : (
                                  <span className="text-yellow-400">${app.reward.toFixed(2)}</span>
                                )}
                              </span>
                            </div>
                            <div className="flex gap-1 mt-1">
                              {app.premiumOnly && (
                                <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded-full">
                                  Premium Only
                                </span>
                              )}
                              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                                {app.type}
                              </span>
                            </div>
                          </div>
                          {app.premiumOnly && !isPremium ? (
                            <button 
                              className="ml-auto bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-1 hover:opacity-90 transition"
                              onClick={upgradeToPremium}
                            >
                              <FaCrown className="text-yellow-300" /> 
                            </button>
                          ) : (
                            <button 
                              className={`ml-auto text-sm px-4 py-2 rounded-lg transition ${app.installed ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium hover:opacity-90'}`}
                              onClick={() => !app.installed && installApp(app.id)}
                              disabled={app.installed}
                            >
                              {app.installed ? 'Installed' : 'Install'}
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'referrals' && (
              <div className="text-center py-8">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 max-w-md mx-auto">
                  <FaShareAlt className="text-4xl text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Refer Friends & Earn More</h3>
                  <p className="text-gray-400 mb-4">
                    Share your referral link and earn 20% of your friends' earnings!
                  </p>
                  <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 mb-4">
                    <p className="text-sm text-gray-300 break-all">
                      https://yourapp.com/ref/username123
                    </p>
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:opacity-90 transition">
                    Copy Referral Link
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="py-4">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FaChartLine className="text-yellow-400" /> Your Statistics
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h4 className="text-gray-400 text-sm mb-1">Total Earnings</h4>
                    <p className="text-2xl font-bold text-yellow-400">${(balance + 42.35).toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h4 className="text-gray-400 text-sm mb-1">Apps Installed</h4>
                    <p className="text-2xl font-bold">{totalInstalls + 17}</p>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-gray-400 text-sm mb-3">Earning History</h4>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex justify-between items-center pb-2 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="bg-yellow-500 bg-opacity-20 p-2 rounded-full">
                            <MdPhoneIphone className="text-yellow-400" />
                          </div>
                          <div>
                            <p className="font-medium">App Installation</p>
                            <p className="text-xs text-gray-400">{new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                        <p className="text-yellow-400 font-bold">+${(Math.random() * 3 + 0.5).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Premium Features Section */}
      {!isPremium && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mt-8 bg-gradient-to-br from-purple-900 to-purple-950 rounded-xl p-6 border border-purple-800"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <FaCrown className="text-yellow-300" /> Unlock Premium Features
              </h2>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <FaGem className="text-purple-300" /> 2x Higher Earnings
                </li>
                <li className="flex items-center gap-2">
                  <MdSecurity className="text-purple-300" /> Premium-Only Apps
                </li>
                <li className="flex items-center gap-2">
                  <RiCouponLine className="text-purple-300" /> Exclusive Offers
                </li>
                <li className="flex items-center gap-2">
                  <FaUserTie className="text-purple-300" /> Priority Support
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-black bg-opacity-30 p-4 rounded-lg border border-purple-700 mb-3">
                <p className="text-gray-400 line-through">$9.99/month</p>
                <p className="text-3xl font-bold text-yellow-300">$4.99<span className="text-lg">/month</span></p>
                <p className="text-xs text-gray-300">Limited Time Offer</p>
              </div>
              <button 
                onClick={upgradeToPremium}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-3 px-8 rounded-lg hover:opacity-90 transition flex items-center gap-2 mx-auto"
              >
                <FaCrown /> Upgrade Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AppInstallIncome;