function HeroSlide({ slide }) {
    return (
        <div className="relative flex min-w-full bg-[#00B9D8]">
            <div className="relative flex h-[753px] w-full overflow-hidden lg:h-auto lg:aspect-[1440/852]">
                <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 h-full w-full object-cover object-[45%_center] lg:h-auto lg:w-full lg:object-contain lg:object-center"
                />

                <div className="relative z-10 flex h-full w-full items-start justify-center px-9 pt-[250px] text-center lg:items-center lg:justify-start lg:px-[220px] lg:pt-0 lg:text-left">
                    <div className="flex w-[300px] flex-col items-center lg:w-[620px] lg:items-start">
                        <p className="text-[12px] font-bold uppercase leading-6 tracking-[0.2px] text-white lg:text-[16px]">
                            {slide.subtitle}
                        </p>

                        <h1 className="mt-[24px] text-[40px] font-bold uppercase leading-[50px] tracking-[0.2px] text-white lg:mt-[38px] lg:text-[64px] lg:leading-[78px]">
                            {slide.title}
                        </h1>

                        <p className="mt-[24px] text-base leading-6 tracking-[0.2px] text-white lg:mt-[28px] lg:w-[430px] lg:text-[22px] lg:leading-[34px]">
                            {slide.description}
                        </p>

                        <button
                            type="button"
                            className="mt-[28px] rounded-[5px] bg-[#2DC071] px-10 py-[15px] text-xl font-bold uppercase leading-8 tracking-[0.2px] text-white lg:mt-[34px] lg:px-[46px] lg:text-[24px] lg:leading-8"
                        >
                            {slide.buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSlide;
