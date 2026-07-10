import ProductCard from "../common/ProductCard";

function ProductGrid({ products, viewMode }) {
    if (viewMode === "list") {
        return (
            <section className="flex w-full justify-center bg-white px-6 pb-20">
                <div className="flex w-full max-w-[1050px] flex-col gap-8">
                    {products.map((product) => (
                        <article
                            key={product.id}
                            className="flex w-full flex-col overflow-hidden bg-white shadow-sm md:flex-row"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-[300px] w-full object-cover md:h-[260px] md:w-[240px]"
                            />

                            <div className="flex flex-1 flex-col justify-center px-8 py-8">
                                <h3 className="text-xl font-bold leading-8 tracking-[0.1px] text-[#252B42]">
                                    {product.name}
                                </h3>

                                <p className="mt-3 text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                                    {product.category}
                                </p>

                                <div className="mt-4 flex items-center gap-2">
                                    <span className="text-base font-bold text-[#BDBDBD]">
                                        ${product.price}
                                    </span>

                                    <span className="text-base font-bold text-[#23856D]">
                                        ${product.discountedPrice}
                                    </span>
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                    {product.colors.map((color) => (
                                        <span
                                            key={color}
                                            className="h-4 w-4 rounded-full"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="flex w-full justify-center bg-white px-6 pb-20">
            <div className="flex w-full max-w-[1050px] flex-col items-center gap-y-12 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-[30px] sm:gap-y-[80px]">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

export default ProductGrid;
