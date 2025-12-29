'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import dynamic from 'next/dynamic'; // 1. Import dynamic

import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';

// --- REFLOW FIX START ---
// We create a simple placeholder div with a fixed height.
// This prevents the "Forced Reflow" warning in your screenshot.
const LoadingFallback = ({ height }) => (
  <div className={`w-full ${height} bg-gray-50 animate-pulse`} />
);

// We attach the loading fallback to every heavy component.
const About = dynamic(() => import('@/app/components/About'), {
  loading: () => <LoadingFallback height="h-[800px]" />
});
const MasterPlan = dynamic(() => import('@/app/components/MasterPlan'), {
  loading: () => <LoadingFallback height="h-[800px]" />
});
const FloorPlans = dynamic(() => import('@/app/components/FloorPlans'), {
  loading: () => <LoadingFallback height="h-[800px]" />
});
const Amenities = dynamic(() => import('@/app/components/Amenities'), {
  loading: () => <LoadingFallback height="h-[600px]" />
});
const Specifications = dynamic(() => import('@/app/components/Specifications'), {
  loading: () => <LoadingFallback height="h-[500px]" />
});
const Location = dynamic(() => import('@/app/components/Location'), {
  loading: () => <LoadingFallback height="h-[600px]" />
});
const Footer = dynamic(() => import('@/app/components/Footer'), {
    loading: () => <LoadingFallback height="h-64 bg-black" />
});
const Gallery = dynamic(() => import('./components/Gallery'), {
  loading: () => <LoadingFallback height="h-[70vh]" />
});

// Lightbox is hidden, so no placeholder needed.
const Lightbox = dynamic(() => import('@/app/components/Lightbox'), { ssr: false });
// --- REFLOW FIX END ---

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    useEffect(() => {
        // We delay GSAP slightly to ensure the hydration matches
        let ctx = gsap.context(() => {
            
            // About Section Animations
            gsap.from("#about-text-content", {
                scrollTrigger: { trigger: "#about", start: "top 70%" },
                opacity: 0, x: 50, duration: 1
            });
            gsap.to("#about-image-1", {
                scrollTrigger: { trigger: "#about", scrub: 1 },
                y: -50
            });
            gsap.to("#about-image-2", {
                scrollTrigger: { trigger: "#about", scrub: 1 },
                y: 50
            });

            // Section Title Animations
            gsap.utils.toArray('.container h2').forEach(heading => {
                gsap.from(heading, {
                    scrollTrigger: { trigger: heading, start: 'top 85%' },
                    opacity: 0, y: 30, duration: 0.8
                });
            });

            // Floor Plan Card Animations
             gsap.from(".floorplan-card", {
                scrollTrigger: { trigger: "#floor-plans", start: "top 70%" },
                opacity: 0, y: 50, duration: 0.8, stagger: 0.2
            });

             // Amenities Container Animation
             gsap.from(".amenities-container", {
                scrollTrigger: { trigger: "#amenities", start: "top 70%" },
                opacity: 0, scale: 0.95, duration: 1
            });

            // Specifications Card Animations
            gsap.from(".spec-category", {
                scrollTrigger: { trigger: "#specifications", start: "top 70%" },
                opacity: 0, y: 50, duration: 0.8, stagger: 0.1
            });

            // Location Section Animations
            gsap.from(".location-map-container", {
                scrollTrigger: { trigger: "#location", start: "top 70%" },
                opacity: 0, x: -50, duration: 1
            });
            gsap.from(".benefit-item", {
                scrollTrigger: { trigger: ".location-benefits-list", start: "top 80%" },
                opacity: 0, x: 50, duration: 0.6, stagger: 0.2
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <Header />
            <main>
                <Hero />
                <About />
                <Gallery />
                <MasterPlan />
                <FloorPlans />
                <Amenities />
                <Specifications />
                <Location />
            </main>
            <Footer />
            <Lightbox />
        </div>
    );
}