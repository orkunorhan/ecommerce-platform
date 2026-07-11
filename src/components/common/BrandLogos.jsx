import brandLogos from "../../data/brandLogos";

function BrandLogos({
    showHeader = false,
    title = "",
    description = "",
    background = "white",
}) {
    return (
        <section
            className={`${background === "gray" ? "bg-[#FAFAFA]" : "bg-white"
                }`}
        >
            {showHeader && (
                <div className="mx-auto flex max-w-[750px] flex-col items-center px-6 text-center">
                    <h2 className="max-w-[280px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:max-w-[420px] lg:max-w-none lg:text-[58px] lg:leading-[80px]">
                        {title}
                    </h2>

                    <p className="mt-6 max-w-[320px] text-sm font-medium leading-7 tracking-[0.2px] text-[#737373] md:max-w-[400px] lg:max-w-[490px]">
                        {description}
                    </p>
                </div>
            )}

            <div
                className={`mx-auto flex max-w-[1124px] flex-col items-center px-10 ${showHeader
                    ? "gap-15 pb-20 pt-16 lg:gap-8 lg:pb-28"
                    : "gap-15 py-20 lg:gap-8"
                    } lg:flex-row lg:justify-between`}
            >
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
