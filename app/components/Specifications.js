import { FiCheckCircle } from 'react-icons/fi';

const specs = {
    "Structure": [
        "RCC framed structure, seismic compliant",
        "Solid cement block masonry"
    ],
    "Flooring": [
        "Italian marble in living and dining areas",
        "Laminated wooden flooring in master bedroom",
        "Premium vitrified tiles in other rooms"
    ],
    "Doors & Windows": [
        "Teak wood frame for main door",
        "UPVC sliding windows with mosquito mesh"
    ],
    "Kitchen": [
        "Granite platform with stainless steel sink",
        "Provision for water purifier and chimney"
    ],
    "Electrical": [
        "Concealed copper wiring (Havells/Anchor or equivalent)",
        "Modular switches (Legrand/Schneider or equivalent)",
        "100% DG backup for all common areas and apartments"
    ],
    "Security": [
        "24/7 CCTV surveillance",
        "Video door phone for each apartment",
        "Intercom facility"
    ]
};

const Specifications = () => {
    return (
        <section id="specifications" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
                    Project Specifications
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {Object.entries(specs).map(([category, items]) => (
                        <div key={category} className="spec-category p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{category}</h3>
                            <ul className="space-y-3">
                                {items.map(item => (
                                    <li key={item} className="flex items-start">
                                        <FiCheckCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Specifications;
