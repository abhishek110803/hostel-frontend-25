import React, { useState, useEffect } from "react";
import image1 from "../../assets/images/ImageGallery/BH1.png";
import image2 from "../../assets/images/ImageGallery/BH11.png";
import image3 from "../../assets/images/ImageGallery/BH7.png";
import image4 from "../../assets/images/ImageGallery/H5.png";
import image5 from "../../assets/images/ImageGallery/MBH-A.png";

const images = [
  { src: image1, alt: "Image 1" },
  { src: image2, alt: "Image 2" },
  { src: image3, alt: "Image 3" },
  { src: image4, alt: "Image 4" },
  { src: image5, alt: "Image 5" },

];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-blue-600 shadow-lg mx-4 sm:mx-8 md:mx-14 my-10 md:my-14 bg-blue-50"
      onMouseEnter={() => setIsHovered(false)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel items */}
      <div className="w-full flex transition-transform duration-1000 ease-in-out transform">
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-full h-48 sm:h-72 md:h-[40rem] overflow-hidden ${
              currentIndex === index ? "block" : "hidden"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-400"
            } focus:outline-none`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
