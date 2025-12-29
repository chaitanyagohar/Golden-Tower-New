'use client';
import { useLightbox } from '@/app/context/LightboxContext';

/* ---------- Inline SVG Icons (Zero JS cost) ---------- */
const ArrowDown = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14" />
    <path d="M19 12l-7 7-7-7" />
  </svg>
);

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12l9-9 9 9v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" />
  </svg>
);

const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.3l6.2 3.7-1.6-7 5.4-4.6-7.1-.6L12 2 9.1 8.8l-7.1.6 5.4 4.6-1.6 7z" />
  </svg>
);
/* ---------------------------------------------------- */

const Hero = () => {
  const { openLightbox } = useLightbox();

  const projectHighlights = [
    { icon: <HomeIcon />, text: 'Premium 3 & 4 BHKs with Community Living' },
    { icon: <MapIcon />, text: '3.1 Acres of Land with 30+ Amenities' },
    { icon: <StarIcon />, text: '2 mins walk from upcoming Kogilu Metro Station' },
  ];

  const handleScrollDown = (e) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/hero-thumbnail.webp"
        className="absolute z-0 w-full h-full object-cover scale-125"
      >
        <source src="/Hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      <div className="relative z-20 text-center p-6 flex flex-col items-center">
        <h1 className="text-5xl md:text-8xl font-extrabold uppercase tracking-widest mb-2">
          Golden Towers
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-orange-300">
          Yelahanka, Kogilu Cross
        </p>

        <div className="space-y-4 my-6 max-w-lg">
          {projectHighlights.map((item, i) => (
            <div key={i} className="bg-black/30 p-4 rounded-lg flex items-center text-left">
              <div className="text-orange-300 mr-4">{item.icon}</div>
              <span className="text-base font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={openLightbox}
          className="bg-yellow-500 text-white px-12 py-4 rounded-md text-lg font-bold mt-4"
        >
          Enquire Now
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <a href="#about" onClick={handleScrollDown} aria-label="Scroll down">
          <ArrowDown />
        </a>
      </div>
    </section>
  );
};

export default Hero;
