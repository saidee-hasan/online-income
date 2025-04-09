import React from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import BottomNavigation from '../shared/BottomNavigation';


function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Notice at the top */}
    

      {/* Navbar */}
      <Navbar />


      <main className="flex-grow  py-6">
        {/* Outlet for nested routes */}
        <Outlet />
      </main>
<BottomNavigation/>
   
    </div>
  );
}

export default MainLayout;
