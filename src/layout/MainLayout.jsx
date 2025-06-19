import React from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import BottomNavigation from '../shared/BottomNavigation';
import Footer from '../common/Footer';


function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Notice at the top */}
    

      {/* Navbar */}
      <Navbar />


      <main className="flex-grow  ">
        {/* Outlet for nested routes */}
        <Outlet />
      </main>
      <Footer/>
<BottomNavigation/>
   
    </div>
  );
}

export default MainLayout;
