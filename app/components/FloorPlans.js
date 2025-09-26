'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useLightbox } from '@/app/context/LightboxContext';
import { FiX } from 'react-icons/fi';

const plans = [
    { name: '3 BHK', size: '1,350-1,600 sq. ft.', image: '/3-bhk.png' },
    { name: '4 BHK', size: '2,000 sq. ft.', image: '/4-bhk.png' },
];

// A new, dedicated component for displaying the image in a lightbox
const ImageLightbox = ({ src, onClose }) => {
    if (!src) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <button 
                onClick={onClose} 
                className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-20"
            >
                <FiX size={32} />
            </button>
            <div className="relative w-full h-5/6" onClick={(e) => e.stopPropagation()}>
                <Image 
                    src={src} 
                    alt="Floor plan lightbox" 
                    fill 
                    className="object-contain" 
                />
            </div>
        </div>
    );
};

const FloorPlanCard = ({ plan, onViewPlan }) => {
    const { openLightbox } = useLightbox();

    return (
        <div className="floorplan-card relative rounded-lg shadow-xl overflow-hidden group h-96">
            <Image src={plan.image} alt={`${plan.name} floor plan`} fill sizes="50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center bg-black/60 backdrop-blur-md">
                <h3 className="text-3xl font-bold">{plan.name}</h3>
                <p className="text-lg mb-6">{plan.size}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* This button now triggers the image lightbox */}
                    <button onClick={() => onViewPlan(plan.image)} className="bg-white/90 text-black px-6 py-3 rounded-md font-bold transition hover:bg-white">View Plan</button>
                    <button onClick={openLightbox} className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-bold transition hover:bg-white hover:text-black">Download Brochure</button>
                </div>
            </div>
        </div>
    );
};

const FloorPlans = () => {
    const [lightboxImage, setLightboxImage] = useState(null);

    const handleViewPlan = (imageSrc) => {
        setLightboxImage(imageSrc);
    };

    const closeImageLightbox = () => {
        setLightboxImage(null);
    };

    return (
        <>
            <section id="floor-plans" className="py-24 bg-gray-100">
                <div className="container mx-auto px-6 text-center">
                     <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Spacious Residences</h2>
                     <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                         {plans.map(plan => <FloorPlanCard key={plan.name} plan={plan} onViewPlan={handleViewPlan} />)}
                     </div>
                </div>
            </section>
            <ImageLightbox src={lightboxImage} onClose={closeImageLightbox} />
        </>
    );
};

export default FloorPlans;

