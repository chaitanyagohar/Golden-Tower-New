'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const amenityImages = [
  { src: '/10.webp', title: 'Aquatic Oasis', description: 'Escape the heat and enjoy resort-style swimming.' },
  { src: '/8.webp', title: 'Fitness Center', description: 'Fully-equipped gym with modern equipment.' },
  { src: '/9.webp', title: 'Indoor Recreation', description: 'Games room for leisure and fun.' },
  { src: '/12.webp', title: 'Event Lawn', description: 'Beautifully landscaped gardens and party lawn.' },
];

const INTERVAL = 5000;

export default function Amenities() {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  // ✅ Start only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // ✅ Run slider only when active
  useEffect(() => {
    if (!active) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % amenityImages.length),
      INTERVAL
    );
    return () => clearInterval(id);
  }, [active]);

  const item = amenityImages[index];

  return (
    <section ref={ref} id="amenities" className="py-24 bg-black">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Unmatched Lifestyle Amenities
        </h2>

        <div className="relative max-w-5xl mx-auto h-[70vh] rounded-lg overflow-hidden">
          <Image
            src={item.src}
            alt={item.title}
            fill
            sizes="80vw"
            quality={60}
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-10">
            <div className="text-center">
              <h3 className="text-white text-3xl font-bold">{item.title}</h3>
              <p className="text-white/90 mt-2 text-lg">{item.description}</p>
            </div>
          </div>

          {/* Inline SVG arrows (no react-icons) */}
          <button
            onClick={() => setIndex((i) => (i - 1 + amenityImages.length) % amenityImages.length)}
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % amenityImages.length)}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
