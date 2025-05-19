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
