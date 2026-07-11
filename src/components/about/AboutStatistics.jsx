function AboutStatistics({ statistics }) {
    return (
        <section className="bg-white px-6 py-20 lg:py-28">
            <div className="mx-auto grid max-w-[1050px] grid-cols-1 gap-y-24 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
                {statistics.map(({ value, label }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center text-center"
                    >
                        <h2 className="text-[58px] font-bold leading-[80px] tracking-[0.2px] text-[#252B42]">
                            {value}
                        </h2>

                        <p className="mt-2 text-base font-bold leading-6 tracking-[0.1px] text-[#737373]">
                            {label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default AboutStatistics;
