import { FaMapMarkerAlt } from "react-icons/fa";

const locationBenefits = [
    { text: '5 Mins to Major Tech Park', icon: <FaMapMarkerAlt /> },
    { text: '1 Mins to Metro Station', icon: <FaMapMarkerAlt /> },
    { text: 'Close to International Schools', icon: <FaMapMarkerAlt /> },
    { text: 'Nearby Premium Hospitals & Malls', icon: <FaMapMarkerAlt /> },
];

const Location = () => {
    return (
        <section id="location" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
                    Prime Location & Connectivity
                </h2>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="location-map-container h-96 md:h-[500px] rounded-lg shadow-2xl overflow-hidden">
                        {/* --- CORRECTED THIS LINE --- */}
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7771.855168934246!2d77.598704!3d13.103774!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19bd0a262743%3A0x5526717bd7cc6d61!2sSLV%20Golden%20Towers!5e0!3m2!1sen!2sin!4v1758880365723!5m2!1sen!2sin" 
                            className="w-full h-full" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                    <div className="location-benefits-list">
                        <h3 className="text-3xl font-bold text-gray-800 mb-6">Key Advantages:</h3>
                        <ul className="space-y-4">
                            {locationBenefits.map(item => (
                                <li key={item.text} className="benefit-item flex items-center text-lg text-gray-600">
                                    <span className="text-blue-600 mr-4">{item.icon}</span>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;