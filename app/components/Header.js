'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLightbox } from '@/app/context/LightboxContext';

const MenuIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Header = () => {
  const { openLightbox } = useLightbox();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setHasScrolled(window.scrollY > 50);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isOpen]);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
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
    <header className={`fixed top-0 w-full z-50 transition ${hasScrolled ? 'bg-black/80 backdrop-blur shadow-lg' : ''}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" onClick={(e) => scrollTo(e, '#hero')}>
          <Image src="/logo.svg" alt="Logo" width={120} height={40} priority />
        </a>

        <nav className="hidden lg:flex gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => scrollTo(e, l.href)} className="text-white/80 hover:text-amber-400">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button onClick={openLightbox} className="bg-white text-black px-6 py-2 rounded-md font-bold">
            Enquire Now
          </button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsOpen(true)} aria-label="Open menu">
          <MenuIcon />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-black transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <button className="self-end text-white" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </button>

          <nav className="flex-grow flex flex-col justify-center items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => scrollTo(e, l.href)} className="text-white text-2xl">
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                openLightbox();
                setIsOpen(false);
              }}
              className="bg-white text-black px-8 py-3 rounded-md font-bold"
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
