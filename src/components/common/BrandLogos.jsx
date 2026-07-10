import brandLogos from "../../data/brandLogos";

function BrandLogos() {
    return (
        <section className="bg-[#FAFAFA]">
            <div className="mx-auto flex max-w-[1124px] flex-col items-center gap-15 px-10 py-20 lg:flex-row lg:justify-between lg:gap-8">
                {brandLogos.map((brand) => (
                    <img
                        key={brand.id}
                        src={brand.logo}
                        alt={brand.name}
                        className="h-auto w-auto object-contain opacity-70 transition-opacity duration-200 hover:opacity-100"
                    />
                ))}
            </div>
        </section>
    );
}

export default BrandLogos;
