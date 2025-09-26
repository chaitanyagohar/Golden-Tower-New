'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const amenityImages = [
    { 
        src: '/10.png', 
        title: 'Aquatic Oasis',
        description: "Escape the heat and dive into our resort-style swimming pool, featuring a dedicated and safe kids\' area for family fun under the sun."
    },
    { 
        src: '/8.png', 
        title: 'State-of-the-Art Fitness Center',
        description: "Achieve your health and wellness goals in our fully-equipped gym, complete with modern cardio machines and a comprehensive range of strength training equipment."
    },
    { 
        src: '/9.png', 
        title: 'Indoor Recreation Zone',
        description: "Unwind and challenge your friends in our vibrant games room, the perfect spot for a friendly match of pool, foosball, or table tennis."
    },
    { 
        src: '/12.png', 
        title: 'Lush Event Lawn & Gardens',
        description: "Host memorable celebrations or enjoy a moment of peace in our beautifully landscaped gardens and expansive party lawn."
    },
];

const Amenities = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex(prev => (prev + 1) % amenityImages.length);
    const prev = () => setCurrentIndex(prev => (prev - 1 + amenityImages.length) % amenityImages.length);

    useEffect(() => {
        const slideTimer = setInterval(next, 5000);
        return () => clearInterval(slideTimer);
    }, []);

    return (
        <section id="amenities" className="py-24 bg-gradient-to-br from-black to-gray-900">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Unmatched Lifestyle Amenities</h2>
                <div className="amenities-container relative max-w-5xl mx-auto h-[70vh] rounded-lg shadow-2xl overflow-hidden group">
                    <div className="w-full h-full">
                        {amenityImages.map((item, index) => (
                            <div key={item.src} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                                <Image src={item.src} alt={item.title} fill sizes="80vw" className="object-cover" />
                                 {/* Adjusted classes for bottom-center alignment */}
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end items-center p-10">
                                    <div className="text-center"> {/* Added text-center here */}
                                      <h3 className="text-white text-3xl font-bold">{item.title}</h3>
                                      <p className="text-white/90 mt-2 text-lg">{item.description}</p> {/* Removed max-w-2xl */}
                                    </div>
                                 </div>
                            </div>
                        ))}
                    </div>
                     <button onClick={prev} className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition"><FiChevronLeft size={30} /></button>
                     <button onClick={next} className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition"><FiChevronRight size={30} /></button>
                </div>
            </div>
        </section>
    );
};

export default Amenities;