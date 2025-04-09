import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';

import { Link } from 'react-router-dom';

function Banner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get('https://madrasha-server-steel.vercel.app/banner')
      .then(response => {
        setBanners(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the banners:", error);
      });
  }, []);

  return (
    <div className="relative ">
      {/* Carousel Section with Hover Effects */}
      <Carousel 
        infiniteLoop={true} 
        autoPlay={true} 
        showArrows={true} 
        showThumbs={false} 
        showStatus={false} 
        interval={5000}
        transitionTime={600}
      >
        {banners.map((banner) => (
          <Link
            to={banner.link_url || "#"} 
            key={banner._id} 
            className="relative block group overflow-hidden"
          >
            <div className="relative">
              <img 
                src={banner.image_url} 
                alt={`Banner ${banner._id}`}
                className="w-full md:h-[350px] rounded-lg h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30 transition-opacity 
                duration-300 group-hover:opacity-20"></div>
            </div>
          </Link>
        ))}
      </Carousel>

      
    </div>
  );
}

export default Banner;