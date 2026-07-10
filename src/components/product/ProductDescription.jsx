import { ChevronRight } from "lucide-react";

function FeatureList({ items }) {
    return (
        <div className="flex flex-col gap-[10px]">
            {items.map((item, index) => (
                <div
                    key={`${item}-${index}`}
                    className="flex items-start gap-5"
                >
                    <ChevronRight
                        size={22}
                        strokeWidth={1.5}
                        className="mt-px shrink-0 text-[#737373]"
                    />

                    <span className="text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                        {item}
                    </span>
                </div>
            ))}
        </div>
    );
}

function ProductDescription({ content }) {
    return (
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-start lg:gap-[42px]">
            <div className="flex w-full overflow-hidden rounded-[6px] shadow-[10px_10px_0px_#F3F3F3] lg:w-[332px] lg:shrink-0">
                <img
                    src={content.image}
                    alt={content.imageAlt}
                    className="h-[392px] w-full object-cover lg:h-[392px]"
                />
            </div>

            <div className="flex w-full flex-col gap-12 lg:flex-row lg:gap-[30px]">
                <div className="flex flex-1 flex-col">
                    <h2 className="text-2xl font-bold leading-8 tracking-[0.1px] text-[#252B42]">
                        {content.title}
                    </h2>

                    <div className="mt-[30px] flex flex-col gap-[20px]">
                        {content.paragraphs.map((paragraph, index) => (
                            <p
                                key={`${paragraph}-${index}`}
                                className="font-semibold text-sm leading-5 tracking-[0.2px] text-[#737373]"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-10">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold leading-8 tracking-[0.1px] text-[#252B42]">
                            {content.title}
                        </h2>

                        <div className="mt-[30px]">
                            <FeatureList items={content.primaryFeatures} />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold leading-8 tracking-[0.1px] text-[#252B42]">
                            {content.title}
                        </h2>

                        <div className="mt-[30px]">
                            <FeatureList items={content.secondaryFeatures} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDescription;
