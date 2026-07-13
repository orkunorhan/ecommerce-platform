import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductCard({ product, showColors = true }) {
    const categories = useSelector(
        (state) => state.product.categories,
    );

    const category = categories.find(
        (item) => item.id === Number(product.category_id),
    );

    const imageUrl =
        product.images?.find((image) => image.index === 0)?.url ||
        product.images?.[0]?.url ||
        product.image ||
        "";

    const categoryName =
        category?.title ||
        product.category ||
        "Category";

    const hasDiscountedPrice =
        product.discountedPrice !== undefined &&
        product.discountedPrice !== null;

    return (
        <Link
            to={`/product/${product.id}`}
            className="flex w-[240px] flex-col items-center bg-white"
        >
            <div className="h-[427px] w-[240px] overflow-hidden bg-[#F3F3F3]">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center px-5 text-center text-sm font-semibold text-[#737373]">
                        Product image is unavailable.
                    </div>
                )}
            </div>

            <div className="flex min-h-[160px] w-full flex-col items-center px-[25px] pb-[35px] pt-[25px] text-center">
                <h3 className="line-clamp-2 text-base font-bold leading-6 tracking-[0.1px] text-[#252B42]">
                    {product.name}
                </h3>

                <p className="mt-[10px] text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                    {categoryName}
                </p>

                <div className="mt-[10px] flex items-center gap-[5px]">
                    {hasDiscountedPrice ? (
                        <>
                            <span className="text-base font-bold leading-6 tracking-[0.1px] text-[#BDBDBD] line-through">
                                ${Number(product.price).toFixed(2)}
                            </span>

                            <span className="text-base font-bold leading-6 tracking-[0.1px] text-[#23856D]">
                                ${Number(product.discountedPrice).toFixed(2)}
                            </span>
                        </>
                    ) : (
                        <span className="text-base font-bold leading-6 tracking-[0.1px] text-[#23856D]">
                            ${Number(product.price).toFixed(2)}
                        </span>
                    )}
                </div>

                {product.rating !== undefined && (
                    <div className="mt-[10px] flex items-center gap-3 text-xs font-semibold text-[#737373]">
                        <span>
                            Rating: {Number(product.rating).toFixed(1)}
                        </span>

                        <span>
                            Sold: {product.sell_count}
                        </span>
                    </div>
                )}

                {showColors && product.colors?.length > 0 && (
                    <div className="mt-[10px] flex items-center gap-[6px]">
                        {product.colors.map((color) => (
                            <span
                                key={color}
                                className="h-4 w-4 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}

export default ProductCard;
