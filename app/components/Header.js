'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { useLightbox } from '@/app/context/LightboxContext';

gsap.registerPlugin(ScrollToPlugin);

const Header = () => {
    const { openLightbox } = useLightbox();
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    // Effect to handle header background change on scroll
    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- NEW: Effect to lock body scroll when mobile menu is open ---
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup function to restore scroll on component unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);


    const handleNavClick = (e, href) => {
        e.preventDefault();
        gsap.to(window, { duration: 1.5, scrollTo: href, ease: 'power2.inOut' });
        setIsOpen(false);
    };

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#gallery', label: 'Gallery' },
        { href: '#master-plan', label: 'Master Plan' },
        { href: '#floor-plans', label: 'Floor Plans' },
        { href: '#amenities', label: 'Amenities' },
        { href: '#location', label: 'Location' },

    ];

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${hasScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="cursor-pointer">
                    <Image src="/logo.svg" alt="Elevant Project Logo" width={120} height={40} priority />
                </a>
                <nav className="hidden lg:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <a key={link.label} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-white/80 font-bold hover:text-amber-400 transition-colors duration-300">{link.label}</a>
                    ))}
                </nav>
                <div className="hidden lg:block">
                    <button onClick={openLightbox} className="bg-white text-black px-6 py-2 rounded-md font-bold hover:bg-gray-200 transition">Enquire Now</button>
                </div>
                <div className="lg:hidden">
                    <button onClick={() => setIsOpen(true)} className="text-white">
                        <FiMenu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`lg:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-br from-black to-gray-900 backdrop-blur-md transform transition-transform duration-500 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-end mb-8">
                        <button onClick={() => setIsOpen(false)} className="text-white">
                            <FiX size={30} />
                        </button>
                    </div>
                    <nav className="flex flex-col items-center justify-center flex-grow space-y-8 text-center pb-16">
                        {navLinks.map(link => (
                             <a key={link.label} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-white text-3xl font-medium hover:text-amber-400 transition-colors duration-300">{link.label}</a>
                        ))}
                        <button 
                            onClick={() => {
                                openLightbox();
                                setIsOpen(false);
                            }} 
                            className="mt-8 bg-white text-black px-8 py-3 rounded-md font-bold text-lg"
                        >
                            Enquire Now
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;

