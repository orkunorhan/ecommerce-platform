import { useSelector } from "react-redux";
import ProductCard from "../common/ProductCard";

function ProductGrid({ products, viewMode }) {
    const categories = useSelector(
        (state) => state.product.categories,
    );

    const getCategoryName = (product) => {
        const category = categories.find(
            (item) =>
                item.id === Number(product.category_id),
        );

        return (
            category?.title ||
            product.category ||
            "Category"
        );
    };

    const getProductImage = (product) => {
        return (
            product.images?.find(
                (image) => image.index === 0,
            )?.url ||
            product.images?.[0]?.url ||
            product.image ||
            ""
        );
    };

    if (viewMode === "list") {
        return (
            <section className="flex w-full justify-center bg-white px-6 pb-20">
                <div className="flex w-full max-w-[1050px] flex-col gap-8">
                    {products.map((product) => {
                        const imageUrl =
                            getProductImage(product);

                        const categoryName =
                            getCategoryName(product);

                        return (
                            <article
                                key={product.id}
                                className="flex w-full flex-col overflow-hidden bg-white shadow-sm md:flex-row"
                            >
                                <div className="h-[300px] w-full shrink-0 overflow-hidden bg-[#F3F3F3] md:h-[260px] md:w-[240px]">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center px-5 text-center text-sm font-semibold text-[#737373]">
                                            Product image is unavailable.
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col justify-center px-8 py-8">
                                    <h3 className="text-xl font-bold leading-8 tracking-[0.1px] text-[#252B42]">
                                        {product.name}
                                    </h3>

                                    <p className="mt-3 text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                                        {categoryName}
                                    </p>

                                    {product.description && (
                                        <p className="mt-3 line-clamp-2 text-sm leading-6 tracking-[0.2px] text-[#737373]">
                                            {product.description}
                                        </p>
                                    )}

                                    <div className="mt-4 flex items-center gap-2">
                                        {product.discountedPrice !==
                                            undefined ? (
                                            <>
                                                <span className="text-base font-bold text-[#BDBDBD] line-through">
                                                    $
                                                    {Number(
                                                        product.price,
                                                    ).toFixed(2)}
                                                </span>

                                                <span className="text-base font-bold text-[#23856D]">
                                                    $
                                                    {Number(
                                                        product.discountedPrice,
                                                    ).toFixed(2)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-base font-bold text-[#23856D]">
                                                $
                                                {Number(
                                                    product.price,
                                                ).toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    {product.rating !== undefined && (
                                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold text-[#737373]">
                                            <span>
                                                Rating:{" "}
                                                {Number(
                                                    product.rating,
                                                ).toFixed(1)}
                                            </span>

                                            <span>
                                                Stock: {product.stock}
                                            </span>

                                            <span>
                                                Sold:{" "}
                                                {product.sell_count}
                                            </span>
                                        </div>
                                    )}

                                    {product.colors?.length > 0 && (
                                        <div className="mt-4 flex items-center gap-2">
                                            {product.colors.map(
                                                (color) => (
                                                    <span
                                                        key={color}
                                                        className="h-4 w-4 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                color,
                                                        }}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        );
    }

    return (
        <section className="flex w-full justify-center bg-white px-6 pb-20">
            <div className="flex w-full max-w-[1050px] flex-col items-center gap-y-12 sm:flex-row sm:flex-wrap sm:justify-start sm:gap-x-[30px] sm:gap-y-[80px]">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProductGrid;
