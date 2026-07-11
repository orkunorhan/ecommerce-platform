function AboutHero({
    eyebrow,
    title,
    description,
    mobileDescriptionLines,
    buttonText,
    image,
}) {
    return (
        <section className="w-full overflow-hidden bg-white">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center pt-20 md:pt-28 lg:min-h-[720px] lg:flex-row lg:items-center lg:pl-[120px] lg:pt-0">
                <div className="z-10 flex w-full flex-col items-center px-6 text-center lg:w-[45%] lg:items-start lg:px-0 lg:text-left">
                    <div className="flex w-full max-w-[420px] flex-col items-center lg:items-start">
                        <p className="hidden text-base font-bold uppercase leading-6 tracking-[0.1px] text-[#252B42] lg:block">
                            {eyebrow}
                        </p>

                        <h1 className="text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] lg:mt-[35px] lg:text-[58px] lg:leading-[80px]">
                            {title}
                        </h1>

                        <p className="mt-9 text-xl leading-[30px] tracking-[0.2px] text-[#737373] md:max-w-[400px] lg:hidden">
                            {mobileDescriptionLines.map((line, index) => (
                                <span
                                    key={`${line}-${index}`}
                                    className="block"
                                >
                                    {line}
                                </span>
                            ))}
                        </p>

                        <p className="mt-9 hidden max-w-[390px] text-xl leading-[30px] tracking-[0.2px] text-[#737373] lg:block">
                            {description}
                        </p>

                        <button
                            type="button"
                            className="mt-9 w-max rounded-[5px] bg-[#23A6F0] px-10 py-[15px] text-sm font-bold leading-[22px] tracking-[0.2px] text-white transition-colors hover:bg-[#1B8ED1]"
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>

                <div className="mt-16 flex w-full justify-center lg:mt-0 lg:w-[55%] lg:justify-end">
                    <img
                        src={image}
                        alt="Customer holding shopping bags"
                        className="block h-auto w-full max-w-[390px] object-contain sm:max-w-[500px] lg:max-w-[650px] xl:max-w-[720px] 2xl:max-w-[760px]"
                    />
                </div>
            </div>
        </section>
    );
}

export default AboutHero;
