import React, { useState, useEffect, useRef } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiStar, FiUser } from 'react-icons/fi';
import { RiVipCrownFill, RiCoinFill, RiSparkling2Fill } from 'react-icons/ri';
import { IoDiamond, IoRocket } from 'react-icons/io5';
import { GiCrystalBars } from 'react-icons/gi';

function PremiumNavigation() {
  const location = useLocation();
  const [activeHover, setActiveHover] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [points, setPoints] = useState(8888);
  const [showEarningToast, setShowEarningToast] = useState(false);
  const [lastEarned, setLastEarned] = useState(0);
  const navRef = useRef(null);
  const streakRef = useRef(0);
  const lastInteractionTime = useRef(Date.now());
  const floatingIcons = useRef([]);

  // Generate floating micro-interaction icons
  useEffect(() => {
    floatingIcons.current = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      icon: [<RiSparkling2Fill />, <IoDiamond />, <GiCrystalBars />][Math.floor(Math.random() * 3)],
      x: Math.random() * 100,
      y: Math.random() * 20 - 10,
      size: Math.random() * 12 + 8,
      opacity: 0,
      delay: Math.random() * 2
    }));
  }, []);

  // Dynamic scroll behavior with momentum detection
  useEffect(() => {
    let lastScroll = 0;
    let velocity = 0;
    let frameId;
    let timeout;

    const updateScroll = () => {
      const currentScroll = window.pageYOffset;
      velocity = currentScroll - lastScroll;
      lastScroll = currentScroll;
      
      setScrolled(velocity > 5 || currentScroll > 100);
      
      // Reset after 1.5s of no scrolling
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (Date.now() - lastInteractionTime.current > 1500) {
          setScrolled(false);
        }
      }, 1500);
      
      frameId = requestAnimationFrame(updateScroll);
    };
    
    frameId = requestAnimationFrame(updateScroll);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeout);
    };
  }, []);

  // Premium points system with engagement rewards
  useEffect(() => {
    const earningInterval = setInterval(() => {
      const now = Date.now();
      const activeMultiplier = (now - lastInteractionTime.current < 300000) ? 
        Math.min(5, 1 + streakRef.current * 0.2) : 1;
      
      const baseEarn = Math.floor(Math.random() * 3) + 1;
      const bonus = Math.floor(baseEarn * activeMultiplier);
      
      setPoints(prev => {
        if (bonus >= 5) {
          setLastEarned(bonus);
          setShowEarningToast(true);
          setTimeout(() => setShowEarningToast(false), 2500);
        }
        return prev + bonus;
      });

      if (activeMultiplier > 1) {
        streakRef.current += 0.5;
      } else {
        streakRef.current = 0;
      }
    }, 30000);

    return () => clearInterval(earningInterval);
  }, []);

  const handleInteraction = () => {
    lastInteractionTime.current = Date.now();
    
    // Generate floating icons on interaction
    floatingIcons.current = floatingIcons.current.map(icon => ({
      ...icon,
      opacity: 0.7,
      y: icon.y - 30,
      x: icon.x + (Math.random() * 20 - 10)
    }));
    
    setTimeout(() => {
      floatingIcons.current = floatingIcons.current.map(icon => ({
        ...icon,
        opacity: 0
      }));
    }, 1000);
  };

  const navItems = [
    {
      path: "/",
      icon: <FiHome className="w-6 h-6" />,
      label: "Nexus",
      color: "text-cyan-400",
      hoverColor: "text-cyan-300",
      gradient: "from-cyan-500 to-blue-600",
      animation: { 
        rotate: [0, 5, -5, 0],
        transition: { duration: 1.5, repeat: Infinity }
      },
      shape: "M12 2L2 7l10 5 10-5-10-5z"
    },
    {
      path: "/vip",
      icon: <RiVipCrownFill className="w-6 h-6" />,
      label: "Elite",
      color: "text-purple-400",
      hoverColor: "text-purple-300",
      gradient: "from-purple-500 to-fuchsia-600",
      badge: "VIP",
      animation: { 
        y: [0, -5, 0],
        rotate: [0, -2, 2, 0],
        transition: { duration: 1.2, repeat: Infinity }
      },
      shape: "M12 2L2 7l10 5 10-5-10-5z"
    },
    {
      path: "/earn",
      icon: <RiCoinFill className="w-6 h-6" />,
      label: "Vault",
      color: "text-amber-400",
      hoverColor: "text-amber-300",
      gradient: "from-amber-500 to-orange-600",
      animation: { 
        scale: [1, 1.1, 1],
        transition: { duration: 1, repeat: Infinity }
      },
      shape: "M12 2L2 7l10 5 10-5-10-5z"
    },
    {
      path: "/profile",
      icon: <FiUser className="w-6 h-6" />,
      label: "Aura",
      color: "text-emerald-400",
      hoverColor: "text-emerald-300",
      gradient: "from-emerald-500 to-teal-600",
      animation: { 
        rotateY: [0, 180, 360],
        transition: { duration: 3, repeat: Infinity, ease: "linear" }
      },
      shape: "M12 2L2 7l10 5 10-5-10-5z"
    }
  ];

  const FloatingMicroIcons = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {floatingIcons.current.map((icon, i) => (
        <motion.div
          key={i}
          className={`absolute text-amber-400 ${i % 2 === 0 ? 'text-cyan-400' : ''} ${i % 3 === 0 ? 'text-purple-400' : ''}`}
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            fontSize: `${icon.size}px`,
            opacity: icon.opacity
          }}
          animate={{
            y: icon.y - 50,
            opacity: 0,
            transition: { 
              duration: 1.5,
              delay: icon.delay,
              ease: "easeOut"
            }
          }}
        >
          {icon.icon}
        </motion.div>
      ))}
    </div>
  );

  return (
    <>
      {/* Premium Points Display */}
      <motion.div
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 10 }}
      >
        <div className="flex items-center bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 shadow-2xl">
          <IoDiamond className="text-cyan-400 mr-2 animate-pulse" />
          <span className="font-mono text-white font-bold text-sm tracking-wider">
            {points.toLocaleString()} CR
          </span>
          <div className="ml-3 h-4 w-px bg-white/20"></div>
          <div className="ml-3 flex items-center">
            <RiSparkling2Fill className="text-amber-400 mr-1" />
            <span className="text-xs font-bold text-amber-400">
              x{streakRef.current.toFixed(1)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Earning Toast with Physics */}
      <AnimatePresence>
        {showEarningToast && (
          <motion.div
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-white px-6 py-3 rounded-full shadow-2xl flex items-center z-50 border border-amber-300/30"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                type: 'spring', 
                stiffness: 500,
                damping: 15
              }
            }}
            exit={{ 
              opacity: 0, 
              y: 20, 
              scale: 0.9,
              transition: { ease: "easeIn" }
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 20, -20, 0],
                transition: { duration: 0.6 }
              }}
            >
              <RiCoinFill className="mr-2 text-2xl text-white" />
            </motion.div>
            <div>
              <motion.div 
                className="font-bold text-sm"
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.2 }
                }}
              >
                +{lastEarned} Premium Credits
              </motion.div>
              <motion.div 
                className="text-xs opacity-90 mt-1"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 0.3 }
                }}
              >
                Active streak: {streakRef.current.toFixed(1)}x
              </motion.div>
            </div>
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-500 rotate-45"
              style={{
                boxShadow: '0 2px 10px rgba(245, 158, 11, 0.5)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation - Premium Glass Panel */}
      <motion.div
        ref={navRef}
        className={`fixed bottom-0 left-0 z-50 w-full h-24 bg-gray-900/90 border-t border-white/10 
          shadow-2xl backdrop-blur-2xl`}
        initial={{ y: 100 }}
        animate={{ 
          y: scrolled ? 100 : 0,
          opacity: scrolled ? 0.8 : 1
        }}
        transition={{ 
          type: 'spring', 
          damping: 25, 
          stiffness: 300 
        }}
        onClick={handleInteraction}
      >
        {/* Floating Micro-interaction Icons */}
        <FloatingMicroIcons />

        {/* Holographic Grid Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full pattern-grid-lg text-white/10" />
        </div>

        {/* Ambient Light Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"
            animate={{
              opacity: [0.1, 0.15, 0.1],
              transition: { duration: 6, repeat: Infinity }
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"
            animate={{
              opacity: [0.1, 0.2, 0.1],
              transition: { duration: 7, repeat: Infinity, delay: 2 }
            }}
          />
        </div>

        {/* Navigation Items */}
        <div className="relative h-full max-w-md mx-auto grid grid-cols-4">
          {/* Active Item Background Morph */}
          <motion.div
            className="absolute inset-0 bg-white/5 rounded-xl backdrop-blur-md"
            layoutId="activeNavBg"
            transition={{ 
              type: 'spring', 
              stiffness: 500, 
              damping: 30 
            }}
          />

          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={index}
                to={item.path}
                className="relative flex flex-col items-center justify-center z-10"
                onMouseEnter={() => {
                  setActiveHover(index);
                  handleInteraction();
                }}
                onMouseLeave={() => setActiveHover(null)}
              >
                {/* 3D Icon Container */}
                <motion.div
                  className={`p-4 rounded-2xl ${isActive ? 
                    `bg-gradient-to-br ${item.gradient} shadow-xl` : 
                    'bg-white/5 backdrop-blur-sm border border-white/5'}`}
                  whileHover={{ 
                    scale: 1.1,
                    y: -8,
                    transition: { type: 'spring', stiffness: 400 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.2 }
                  }}
                  animate={{
                    y: isActive ? -10 : 0,
                    boxShadow: isActive ? 
                      `0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 20px ${item.hoverColor.replace('text-', 'rgba(').replace('-', ', ')}/0.3)` : 
                      '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                >
                  <motion.div
                    animate={isActive ? item.animation : {}}
                    className={`${isActive ? 'text-white' : item.color} hover:${item.hoverColor}`}
                  >
                    {item.icon}
                  </motion.div>
                </motion.div>

                {/* Floating Label with Glow */}
                <motion.span
                  className={`text-xs font-medium mt-2 ${isActive ? 'text-white font-bold' : 'text-gray-400'}`}
                  initial={{ y: 0 }}
                  animate={{ 
                    y: isActive ? -5 : 0,
                    color: isActive ? 'white' : activeHover === index ? item.hoverColor : 'rgb(156, 163, 175)',
                    textShadow: isActive ? `0 0 10px ${item.hoverColor.replace('text-', '')}` : 'none',
                    transition: { type: 'spring', stiffness: 500 }
                  }}
                >
                  {item.label}
                </motion.span>

                {/* Premium Badge */}
                {item.badge && (
                  <motion.span
                    className="absolute top-1 right-4 bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg flex items-center"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      rotate: [0, 10, -10, 0],
                      transition: { 
                        type: 'spring',
                        delay: 0.3,
                        rotate: { duration: 0.6 }
                      }
                    }}
                    whileHover={{
                      scale: [1, 1.2, 1],
                      y: [0, -3, 0],
                      transition: { duration: 0.4 }
                    }}
                  >
                    <IoDiamond className="mr-1" />
                    {item.badge}
                  </motion.span>
                )}

                {/* Hover Tooltip */}
                <AnimatePresence>
                  {activeHover === index && !isActive && (
                    <motion.div
                      className="absolute top-0 bg-gray-800/90 text-white text-xs py-2 px-3 rounded-lg shadow-xl backdrop-blur-sm border border-white/10 flex items-center"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        y: -60,
                        scale: 1,
                        transition: { 
                          type: 'spring', 
                          stiffness: 500,
                          damping: 20
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: 20, 
                        scale: 0.9,
                        transition: { ease: "easeIn" }
                      }}
                    >
                      <RiSparkling2Fill className={`mr-2 ${item.color.replace('text-', '')}`} />
                      {item.label}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-800/90 rotate-45 border-b border-r border-white/10"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </div>

        {/* Interactive Glow Border */}
        <motion.div
          className="absolute inset-0 rounded-t-2xl pointer-events-none border border-transparent"
          animate={{
            borderColor: activeHover !== null ? 
              `rgba(${
                activeHover === 0 ? '59, 130, 246' : 
                activeHover === 1 ? '168, 85, 247' : 
                activeHover === 2 ? '245, 158, 11' : 
                '16, 185, 129'}, 0.3)` : 'transparent',
            boxShadow: activeHover !== null ? 
              `0 0 30px 5px rgba(${
                activeHover === 0 ? '59, 130, 246' : 
                activeHover === 1 ? '168, 85, 247' : 
                activeHover === 2 ? '245, 158, 11' : 
                '16, 185, 129'}, 0.2)` : 'none'
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Animated Plasma Trail */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-500"
          initial={{ width: 0 }}
          animate={{ 
            width: '100%',
            backgroundPosition: ['0% 50%', '100% 50%']
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        />
      </motion.div>
    </>
  );
}

export default PremiumNavigation;