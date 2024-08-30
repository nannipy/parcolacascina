import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);



  return (
    <div className="carousel-container rounded-lg">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="Product"
          className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}

    </div>
  );
};

export default Carousel;
