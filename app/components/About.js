import Image from 'next/image';

const About = () => {
    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div id="about-text-content" className="text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Redefining Urban Elegance</h2>
                    <p className="text-gray-600 mb-4 text-lg">
                        Elevant is a testament to modern architectural brilliance, designed for those who seek an extraordinary lifestyle. Nestled in a prime location, it offers a sanctuary of peace and luxury amidst the vibrant city life.
                    </p>
                    <p className="text-gray-600 text-lg">
                        Every residence is a masterpiece of design, ensuring spacious living with abundant natural light and breathtaking views, setting a new benchmark for premium living.
                    </p>
                </div>
                <div className="relative h-96 md:h-[600px]">
                    <div id="about-image-1" className="absolute top-0 left-0 w-3/4 h-3/4 rounded-lg shadow-2xl overflow-hidden">
                        <Image src="/image_1.png" alt="Elegant living room" fill sizes="50vw" className="object-cover" />
                    </div>
                    <div id="about-image-2" className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-lg shadow-2xl overflow-hidden border-8 border-white">
                         <Image src="/image_2.png" alt="View from the balcony" fill sizes="50vw" className="object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
