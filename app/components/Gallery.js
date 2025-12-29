'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const images = [
  '/Scene 57.webp',
  '/Image_2.webp',
  '/Scene 7.webp',
  '/Scene 52.webp',
  '/Image_18.webp',
  '/Image_20.webp',
];

const INTERVAL = 5000;

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      INTERVAL
    );
    return () => clearInterval(id);
  }, [active]);

  return (
    <section ref={ref} className="py-16 bg-black">
      <div className="relative h-[70vh]">
        <Image
          src={images[index]}
          alt="Project gallery"
          fill
          sizes="100vw"
          quality={60}
          className="object-cover"
        />

        <button
          onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white"
        >
          <FiChevronLeft size={24} />
        </button>

        <button
          onClick={() => setIndex((i) => (i + 1) % images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
