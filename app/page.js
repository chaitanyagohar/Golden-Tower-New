'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import dynamic from 'next/dynamic'; // 1. Import dynamic

// 2. Keep Above-the-Fold components as standard imports (Instant Load)
import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';

// 3. Lazy Load "Below-the-Fold" components to reduce initial bundle size
// This makes the site interactive much faster.
const About = dynamic(() => import('@/app/components/About'));
const MasterPlan = dynamic(() => import('@/app/components/MasterPlan'));
const FloorPlans = dynamic(() => import('@/app/components/FloorPlans'));
const Amenities = dynamic(() => import('@/app/components/Amenities'));
const Specifications = dynamic(() => import('@/app/components/Specifications'));
const Location = dynamic(() => import('@/app/components/Location'));
const Footer = dynamic(() => import('@/app/components/Footer'));
const Gallery = dynamic(() => import('./components/Gallery'));

// 4. Heavy interactive components that are hidden initially
// ssr: false means "Don't build this on the server, only load on client".
const Lightbox = dynamic(() => import('@/app/components/Lightbox'), {
  ssr: false,
});


gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    useEffect(() => {
        // We use a slight delay or check to ensure DOM is ready for GSAP
        // since we are now lazy loading chunks.
        let ctx = gsap.context(() => {
            
            // About Section Animations
            // Note: Since 'About' is now dynamic, ensure these IDs exist in the About component HTML
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
            // We use ScrollTrigger.refresh() later to account for lazy loaded height changes
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