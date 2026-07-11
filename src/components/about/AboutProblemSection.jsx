function AboutProblemSection({
    eyebrow,
    title,
    description,
}) {
    return (
        <section className="w-full bg-white px-6 py-20 lg:py-24">
            <div className="mx-auto w-full max-w-[1050px]">
                <p className="text-center text-xl leading-[30px] tracking-[0.2px] text-[#E74040] lg:text-left">
                    {eyebrow}
                </p>

                <div className="mt-10 flex flex-col items-center gap-16 lg:mt-8 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
                    <div className="flex w-full justify-center lg:block lg:w-[37%]">
                        <h2 className="max-w-[300px] text-center text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42] lg:max-w-none lg:text-left">
                            {title}
                        </h2>
                    </div>

                    <div className="w-full max-w-[360px] lg:max-w-none lg:w-[52%]">
                        <p className="text-left text-base font-semibold leading-[24px] tracking-[0.2px] text-[#737373] lg:text-[16px] lg:leading-[28px]">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutProblemSection;
