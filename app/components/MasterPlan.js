import Image from "next/image";

const MasterPlan = () => {
    return (
        <section
            id="master-plan"
            className="relative w-full flex items-center justify-center bg-black"
        >
            {/* Container with fixed aspect ratio for responsiveness */}
            <div className="relative w-full max-w-6xl aspect-[16/9]">
                <Image
                    id="masterplan-img-parallax"
                    src="/masterplan.png"
                    alt="Project master plan"
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                />
            </div>

            {/* Overlay for text */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex items-center justify-center z-10">
                <h2 className="text-4xl md:text-7xl font-extrabold text-white uppercase tracking-widest">
                    Master Plan
                </h2>
            </div>
        </section>
    );
};

export default MasterPlan;
