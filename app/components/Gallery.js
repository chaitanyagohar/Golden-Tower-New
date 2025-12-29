'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause } from 'react-icons/fi';

// --- PERFORMANCE NOTE: Converted to .webp for speed ---
const sliderImages = [
  { src: '/Scene 57.webp', alt: 'A beautiful landscape' },
  { src: '/Image_2.webp', alt: 'A modern architectural building' },
  { src: '/Scene 7.webp', alt: 'A bustling city street at night' },
  { src: '/Scene 52.webp', alt: 'Close-up of a colorful flower' },
  { src: '/Image_18.webp', alt: 'Close-up of a colorful flower' },
  { src: '/Image_20.webp', alt: 'Close-up of a colorful flower' },
];
// ------------------------------------

const SLIDE_INTERVAL = 5000;

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
        );
      }, SLIDE_INTERVAL);
    }
    return () => resetTimeout();
  }, [currentIndex, isPlaying]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
    setIsPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const togglePlayPause = () => setIsPlaying((prev) => !prev);

  return (
    <section id="gallery" className="py-16 bg-gradient-to-br from-black to-gray-900" >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-white font-bold text-center mb-12">Project Gallery</h2>
      </div>
      <div className="relative w-full h-[70vh] group">
        {/* Current Image */}
        <div className="w-full h-full relative">
          <Image
            src={sliderImages[currentIndex].src}
            alt={sliderImages[currentIndex].alt}
            fill
            // SIZES FIX: Tells browser to fetch appropriate size, not full 4K
            sizes="100vw"
            // PRIORITY: Ensures the active image loads fast, but allows lazy loading for others if we cached them
            priority={true} 
            // QUALITY: Reduces file size significantly
            quality={60}
            className="object-cover transition-opacity duration-500"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 z-10"
          aria-label="Previous image"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 z-10"
          aria-label="Next image"
        >
          <FiChevronRight size={24} />
        </button>
        <button
          onClick={togglePlayPause}
          className="absolute bottom-5 left-5 bg-black/40 p-2 rounded-full text-white hover:bg-black/60 transition-all z-10"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
        </button>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;