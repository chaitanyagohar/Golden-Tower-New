'use client';
import { useLightbox } from '@/app/context/LightboxContext';
import { FiArrowDown } from 'react-icons/fi';
import { FaHome, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
    const { openLightbox } = useLightbox();

    // Smooth scroll handler
    const handleScrollDown = (e) => {
        e.preventDefault();
        gsap.to(window, { duration: 1.5, scrollTo: '#about', ease: 'power2.inOut' });
    };
    
    // Key project details
    const projectHighlights = [
        { icon: <FaHome size={20} />, text: 'Premium 3 & 4 BHKs with Community Living' },
        { icon: <FaMapMarkerAlt size={20} />, text: 'Multiple Towers with Acres of Total Land Parcel' },
        { icon: <FaStar size={20} />, text: '2 mins walk from upcoming Kogilu Metro Station' },
    ];

    return (
        <section id="hero" className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute z-0 w-full h-full object-cover scale-125"
            >
                <source src="/Hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <div className="relative z-20 text-center p-6 flex flex-col items-center">
                <h1 className="text-5xl md:text-8xl font-extrabold uppercase tracking-widest mb-2">Golden Towers</h1>
                <p className="text-lg md:text-2xl font-light mb-8 text-orange-300">Yelahanka , Kogilu Cross</p>
                
                <div className="space-y-4 my-6 max-w-lg">
                    {projectHighlights.map((item, index) => (
                        <div key={index} className="bg-black/30 backdrop-blur-sm p-4 rounded-lg flex items-center text-left">
                            <div className="text-orange-300 mr-4">{item.icon}</div>
                            <span className="text-base font-medium">{item.text}</span>
                        </div>
                    ))}
                </div>

                <button onClick={openLightbox} className="bg-black text-white px-12 py-4 rounded-md text-lg font-bold border border-white/50 hover:bg-white hover:text-black transition-colors duration-300 mt-4">
                    Enquire Now
                </button>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
                <a href="#about" onClick={handleScrollDown}>
                    <FiArrowDown size={30} className="animate-bounce" />
                </a>
            </div>
        </section>
    );
};

export default Hero;

