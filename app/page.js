'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import MasterPlan from '@/app/components/MasterPlan';
import FloorPlans from '@/app/components/FloorPlans';
import Amenities from '@/app/components/Amenities';
import Specifications from '@/app/components/Specifications';
import Location from '@/app/components/Location';
import Footer from '@/app/components/Footer';
import Lightbox from '@/app/components/Lightbox';
import Gallery from './components/Gallery';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    useEffect(() => {
        const ctx = gsap.context(() => {
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

