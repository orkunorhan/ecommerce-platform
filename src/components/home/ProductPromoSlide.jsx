function ProductPromoSlide({ slide }) {
    return (
        <div className="flex min-w-full bg-[#23856D]">
            <div className="flex w-full flex-col items-center overflow-hidden text-center lg:h-[709px] lg:flex-row lg:justify-center lg:text-left">
                <div className="z-10 flex w-full flex-col items-center px-8 pt-[112px] text-white lg:w-[520px] lg:items-start lg:px-0 lg:pt-0">
                    <p className="text-xl font-bold uppercase leading-[30px] tracking-[0.2px]">
                        {slide.subtitle}
                    </p>

                    <h2 className="mt-[30px] text-[40px] font-bold leading-[50px] tracking-[0.2px] lg:text-[58px] lg:leading-[80px]">
                        {slide.title}
                    </h2>

                    <p className="mt-[30px] max-w-[320px] text-xl leading-[30px] tracking-[0.2px] lg:max-w-[376px]">
                        {slide.description}
                    </p>

                    <div className="mt-[30px] flex flex-col items-center gap-5 lg:flex-row">
                        <span className="text-2xl font-bold leading-8 tracking-[0.1px]">
                            ${slide.price}
                        </span>

                        <button
                            type="button"
                            className="rounded-[5px] bg-[#2DC071] px-10 py-[15px] text-sm font-bold uppercase leading-[22px] tracking-[0.2px]"
                        >
                            {slide.buttonText}
                        </button>
                    </div>
                </div>

                <div className="mt-10 flex w-full justify-center lg:mt-0 lg:w-[560px] lg:justify-end">
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full max-w-[620px] object-contain lg:h-[709px] lg:w-auto lg:max-w-none"
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductPromoSlide;
