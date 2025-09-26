import Image from "next/image";

const MasterPlan = () => {
    return (
        <section id="master-plan" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0">
                <Image
                    id="masterplan-img-parallax"
                    src="/masterplan.png"
                    alt="Project master plan"
                    fill
                    sizes="100vw"
                    className="object-contain md:object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 text-center">
                <h2 className="text-5xl md:text-7xl font-extrabold text-white uppercase tracking-widest">Master Plan</h2>
            </div>
        </section>
    );
};

export default MasterPlan;
