import React, { useState, useEffect } from 'react';
import { FaGooglePlay, FaCoins, FaGem, FaCrown, FaChartLine, FaUserTie, FaShareAlt } from 'react-icons/fa';
import { MdSecurity, MdPhoneIphone, MdAttachMoney, MdTimer } from 'react-icons/md';
import { RiCouponLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const AppInstallIncome = () => {
  const [activeTab, setActiveTab] = useState('earn');
  const [isPremium, setIsPremium] = useState(false);
  const [balance, setBalance] = useState(12.75);
  const [dailyApps, setDailyApps] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalInstalls, setTotalInstalls] = useState(0);
  const [referralCount, setReferralCount] = useState(0);

  // Generate random apps for demonstration
  useEffect(() => {
    const appCategories = [
      { name: "Games", icon: "🎮", color: "bg-red-500" },
      { name: "Social", icon: "💬", color: "bg-blue-500" },
      { name: "Shopping", icon: "🛍️", color: "bg-green-500" },
      { name: "Finance", icon: "💰", color: "bg-yellow-500" },
      { name: "Health", icon: "🏥", color: "bg-purple-500" },
    ];

    const generatedApps = Array.from({ length: 20 }, (_, i) => {
      const category = appCategories[Math.floor(Math.random() * appCategories.length)];
      const reward = (Math.random() * 3 + 0.5).toFixed(2);
      return {
        id: i + 1,
        name: `${category.name} App ${i + 1}`,
        icon: category.icon,
        category: category.name,
        reward: parseFloat(reward),
        color: category.color,
        installed: false,
        premiumOnly: Math.random() > 0.7
      };
    });

    setDailyApps(generatedApps);
    
    // Set a random timer for new apps (1-24 hours)
    setTimeLeft(Math.floor(Math.random() * 24 * 60 * 60));
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

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
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const features = [
    {
      icon: <FaCoins className="text-yellow-400 text-2xl" />,
      title: "Daily Rewards",
      desc: "Earn coins every day just for opening the app",
      stat: "Up to $5/day"
    },
    {
      icon: <MdPhoneIphone className="text-blue-400 text-2xl" />,
      title: "App Install Bonuses",
      desc: "Get paid for trying new apps",
      stat: "100+ apps available"
    },
    {
      icon: <FaChartLine className="text-green-400 text-2xl" />,
      title: "Referral Program",
      desc: "Earn 25% of what your friends make",
      stat: `${referralCount} friends joined`
    },
    {
      icon: <MdSecurity className="text-purple-400 text-2xl" />,
      title: "Secure Payments",
      desc: "Withdraw via PayPal, Paytm or bank transfer",
      stat: "100% secure"
    }
  ];

  const premiumFeatures = [
    {
      icon: <FaCrown className="text-yellow-500 text-2xl" />,
      title: "3x Earnings",
      desc: "Triple rewards on all activities",
      stat: "300% more"
    },
    {
      icon: <FaGem className="text-pink-500 text-2xl" />,
      title: "Exclusive Offers",
      desc: "Access to high-paying premium offers",
      stat: "50+ exclusive apps"
    },
    {
      icon: <FaUserTie className="text-blue-500 text-2xl" />,
      title: "Priority Support",
      desc: "24/7 dedicated support team",
      stat: "Instant response"
    },
    {
      icon: <MdAttachMoney className="text-green-500 text-2xl" />,
      title: "No Minimum Withdrawal",
      desc: "Withdraw any amount instantly",
      stat: "$0.01 minimum"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isPremium ? (
              <><span className="text-purple-400">Premium</span> Earnings Power!</>
            ) : (
              <>Earn Money by <span className="text-yellow-400">Installing Apps</span></>
            )}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {isPremium 
              ? "You're earning 3x more with premium! Install apps faster and withdraw anytime."
              : "Get paid for trying new apps and games. Withdraw your earnings instantly!"}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition">
              <FaGooglePlay /> Install Now
            </button>
            <button 
              onClick={() => setIsPremium(!isPremium)}
              className={`${isPremium ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-gray-700 hover:bg-gray-600'} font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition shadow-lg`}
            >
              <FaCrown /> {isPremium ? 'Premium Active' : 'Go Premium'}
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">${balance.toFixed(2)}</div>
              <div className="text-sm text-gray-400">Your Balance</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold">{totalInstalls}</div>
              <div className="text-sm text-gray-400">Apps Installed</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold">{dailyApps.filter(a => a.installed).length}/{dailyApps.length}</div>
              <div className="text-sm text-gray-400">Today's Apps</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold">{referralCount}</div>
              <div className="text-sm text-gray-400">Referrals</div>
            </div>
          </div>
        </motion.div>

        {/* App Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-800 rounded-2xl p-2 max-w-md mx-auto shadow-xl border border-gray-700"
        >
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <FaCoins className="text-black" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Balance</div>
                  <div className="font-bold">${balance.toFixed(2)}</div>
                </div>
              </div>
              <div className={`${isPremium ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-700'} text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
                {isPremium ? <FaCrown className="text-yellow-300" /> : null} {isPremium ? 'PREMIUM' : 'BASIC'}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-4">
              <button 
                onClick={() => setActiveTab('earn')}
                className={`px-4 py-2 font-medium ${activeTab === 'earn' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`}
              >
                Earn
              </button>
              <button 
                onClick={() => setActiveTab('withdraw')}
                className={`px-4 py-2 font-medium ${activeTab === 'withdraw' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`}
              >
                Withdraw
              </button>
              <button 
                onClick={() => setActiveTab('refer')}
                className={`px-4 py-2 font-medium ${activeTab === 'refer' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`}
              >
                Refer
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'earn' && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {timeLeft > 0 && (
                  <div className="bg-blue-900 bg-opacity-30 p-3 rounded-lg flex items-center gap-3 text-sm">
                    <MdTimer className="text-blue-400 text-xl" />
                    <div>
                      <h3 className="font-medium">New apps in:</h3>
                      <p className="text-blue-300">{formatTime(timeLeft)}</p>
                    </div>
                  </div>
                )}
                
                {dailyApps.map((app) => (
                  <div 
                    key={app.id} 
                    className={`bg-gray-800 p-3 rounded-lg flex items-center gap-3 ${app.premiumOnly && !isPremium ? 'opacity-60' : ''}`}
                  >
                    <div className={`${app.color} p-2 rounded-lg`}>
                      <span className="text-xl">{app.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{app.name}</h3>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{app.category}</span>
                        <span className="text-yellow-400">${isPremium ? (app.reward * 2).toFixed(2) : app.reward.toFixed(2)}</span>
                      </div>
                    </div>
                    {app.premiumOnly && !isPremium ? (
                      <button 
                        className="ml-auto bg-purple-600 text-white text-sm px-3 py-1 rounded flex items-center gap-1"
                        onClick={() => setIsPremium(true)}
                      >
                        <FaCrown /> Premium
                      </button>
                    ) : (
                      <button 
                        className={`ml-auto ${app.installed ? 'bg-gray-600 text-gray-400' : 'bg-yellow-400 text-black'} text-sm px-3 py-1 rounded`}
                        onClick={() => !app.installed && installApp(app.id)}
                        disabled={app.installed}
                      >
                        {app.installed ? 'Installed' : 'Install'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'withdraw' && (
              <div className="text-center py-8">
                <div className="text-5xl mb-2">💰</div>
                <h3 className="font-bold mb-1">Withdraw Your Earnings</h3>
                <p className="text-sm text-gray-400">
                  {isPremium ? "Premium: No minimum withdrawal!" : "Minimum withdrawal: $5.00"}
                </p>
                
                <div className="mt-6 space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="font-bold text-lg mb-2">${balance.toFixed(2)}</div>
                    <p className="text-sm text-gray-400">Available Balance</p>
                    <button 
                      className={`mt-3 w-full py-2 rounded-lg font-medium ${balance >= (isPremium ? 0.01 : 5) ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-gray-400'}`}
                      disabled={balance < (isPremium ? 0.01 : 5)}
                    >
                      Withdraw Now
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {['PayPal', 'Paytm', 'Bank'].map(method => (
                      <div key={method} className="bg-gray-800 p-2 rounded-lg flex flex-col items-center">
                        <div className="text-xl mb-1">
                          {method === 'PayPal' ? '💳' : method === 'Paytm' ? '📱' : '🏦'}
                        </div>
                        <div className="text-xs">{method}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'refer' && (
              <div className="text-center py-4">
                <div className="text-5xl mb-2">👥</div>
                <h3 className="font-bold mb-1">Invite Friends</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Earn 25% of their earnings {isPremium && <span className="text-yellow-400">+ $1 bonus per friend!</span>}
                </p>
                
                <div className="bg-gray-700 p-3 rounded-lg text-sm mb-4">
                  <p>Your referral code:</p>
                  <p className="font-mono bg-gray-800 p-2 rounded mt-1">EARN{Math.floor(Math.random() * 1000)}</p>
                </div>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg flex items-center justify-center gap-2">
                  <FaShareAlt /> Share Referral Link
                </button>
                
                {isPremium && (
                  <div className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg">
                    <h4 className="font-bold flex items-center justify-center gap-1">
                      <FaCrown /> Premium Bonus
                    </h4>
                    <p className="text-xs">You get $1 for every friend who joins!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isPremium ? 'Unlocked Premium Features' : 'How It Works'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(isPremium ? [...features, ...premiumFeatures] : features).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-700 p-6 rounded-xl hover:bg-gray-600 transition cursor-pointer ${index >= features.length ? 'border-2 border-yellow-400' : ''}`}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-300 mb-3">{feature.desc}</p>
                <p className="text-yellow-400 text-sm font-medium">{feature.stat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Comparison */}
      <div className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Premium vs Free</h2>
          
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Free Tier */}
              <div className="p-8 border-b md:border-b-0 md:border-r border-gray-700">
                <h3 className="text-2xl font-bold mb-4">Free Version</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>Earn $0.50 - $3.00 per app</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>20-30 apps available daily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>25% referral earnings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>$5 minimum withdrawal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>Standard support</span>
                  </li>
                </ul>
              </div>
              
              {/* Premium Tier */}
              <div className="p-8 bg-gray-700 relative">
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                  RECOMMENDED
                </div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FaCrown className="text-yellow-400" /> Premium Version
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Earn $1.50 - $9.00 per app (3x more!)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>50-70 apps available daily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>25% referral earnings + $1 bonus per friend</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>No minimum withdrawal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Priority 24/7 support</span>
                  </li>
                </ul>
                
                <button 
                  onClick={() => setIsPremium(true)}
                  className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                >
                  <FaCrown /> Upgrade Now - $9.99/month
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul S.",
                earnings: "$245",
                text: "I earned enough for my college books in just 2 weeks!",
                premium: false
              },
              {
                name: "Priya M.",
                earnings: "$520",
                text: "Premium was a game-changer - earning 3x more now!",
                premium: true
              },
              {
                name: "Amit K.",
                earnings: "$1,240",
                text: "With referrals and premium, this is now my main income source!",
                premium: true
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`bg-gray-800 p-6 rounded-xl border ${testimonial.premium ? 'border-yellow-400' : 'border-gray-700'}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <div className="flex items-center text-sm">
                      <span className="text-yellow-400">Earned: {testimonial.earnings}</span>
                      {testimonial.premium && (
                        <span className="ml-2 bg-purple-600 text-xs px-2 py-0.5 rounded-full flex items-center">
                          <FaCrown className="mr-1" /> Premium
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {isPremium 
              ? "You're crushing it with Premium! Invite friends to earn even more."
              : "Join thousands of users making money in their free time"}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white hover:bg-gray-100 text-black font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition">
              <FaGooglePlay /> Install Now
            </button>
            <button 
              onClick={() => setIsPremium(!isPremium)}
              className={`${isPremium ? 'bg-black bg-opacity-30 hover:bg-opacity-50' : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black'} font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition border border-white`}
            >
              <FaCrown /> {isPremium ? 'Premium Active' : 'Go Premium'}
            </button>
          </div>
          
          {!isPremium && (
            <div className="mt-8 bg-black bg-opacity-20 p-4 rounded-lg inline-block">
              <div className="flex items-center gap-2">
                <RiCouponLine className="text-yellow-300" />
                <span>Use code <strong>EARN100</strong> for 10% off first month!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppInstallIncome;