import ProductCard from "./ProductCard";
import products from "../../data/products";

function BestsellerProducts({
    eyebrow = "Featured Products",
    title = "Bestseller Products",
    description = "Problems trying to resolve the conflict between",
    productsData = products,
    showColors = true,
    className = "",
}) {
    const hasIntroContent = Boolean(eyebrow || description);

    return (
        <section
            className={`flex flex-col items-center bg-white px-10 py-20 ${className}`}
        >
            <div className="flex w-full max-w-[1050px] flex-col">
                <div
                    className={`flex flex-col ${hasIntroContent
                            ? "items-center text-center"
                            : "items-start text-left"
                        }`}
                >
                    {eyebrow && (
                        <p className="text-xl leading-[30px] tracking-[0.2px] text-[#737373]">
                            {eyebrow}
                        </p>
                    )}

                    <h2
                        className={`text-2xl font-bold uppercase leading-8 tracking-[0.1px] text-[#252B42] ${eyebrow ? "mt-[10px]" : ""
                            }`}
                    >
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-[10px] max-w-[260px] text-sm leading-5 tracking-[0.2px] text-[#737373] md:max-w-none">
                            {description}
                        </p>
                    )}
                </div>

                {!hasIntroContent && (
                    <div className="mt-6 h-px w-full bg-[#ECECEC]" />
                )}

                <div className="mt-12 flex w-full flex-col items-center gap-y-[80px] md:flex-row md:flex-wrap md:justify-center md:gap-x-[30px]">
                    {productsData.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            showColors={showColors}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BestsellerProducts;
