import {
    Eye,
    Heart,
    ShoppingCart,
    Star,
} from "lucide-react";

function ProductInfo({ product }) {
    const rating = Number(product.rating) || 0;
    const roundedRating = Math.round(rating);
    const price = Number(product.price) || 0;
    const stock = Number(product.stock) || 0;
    const sellCount = Number(product.sell_count) || 0;

    return (
        <div className="flex w-full flex-col text-left lg:max-w-[510px]">
            <h1 className="text-xl font-normal leading-[30px] tracking-[0.2px] text-[#252B42]">
                {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
                <div
                    aria-label={`${rating} out of 5 stars`}
                    className="flex items-center gap-1"
                >
                    {Array.from({ length: 5 }, (_, index) => {
                        const isFilled = index < roundedRating;

                        return (
                            <Star
                                key={index}
                                size={22}
                                fill={
                                    isFilled
                                        ? "#F3CD03"
                                        : "transparent"
                                }
                                className="text-[#F3CD03]"
                            />
                        );
                    })}
                </div>

                <span className="text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                    {rating.toFixed(1)} Rating
                </span>

                <span className="text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                    {sellCount} Sold
                </span>
            </div>

            <p className="mt-5 text-2xl font-bold leading-8 tracking-[0.1px] text-[#252B42]">
                $
                {price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </p>

            <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                    Availability:
                </span>

                <span
                    className={`text-sm font-bold leading-6 tracking-[0.2px] ${stock > 0
                        ? "text-[#23A6F0]"
                        : "text-[#E74040]"
                        }`}
                >
                    {stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
            </div>

            {stock > 0 && (
                <p className="mt-1 text-sm font-semibold text-[#737373]">
                    {stock} items available
                </p>
            )}

            <p className="mt-8 max-w-[465px] text-sm font-semibold leading-5 tracking-[0.2px] text-[#858585] md:text-base md:leading-6">
                {product.description}
            </p>

            <div className="mt-7 h-px w-full bg-[#BDBDBD]" />

            <div className="mt-16 flex flex-wrap items-center gap-[10px]">
                <button
                    type="button"
                    disabled={stock <= 0}
                    className="flex h-[44px] items-center justify-center rounded-[5px] bg-[#23A6F0] px-5 text-sm font-bold leading-[22px] tracking-[0.2px] text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:bg-[#BDBDBD]"
                >
                    {stock > 0 ? "Select Options" : "Out of Stock"}
                </button>

                <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-[#252B42] transition-colors hover:bg-[#F3F3F3]"
                >
                    <Heart size={20} />
                </button>

                <button
                    type="button"
                    aria-label="Add to cart"
                    disabled={stock <= 0}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-[#252B42] transition-colors hover:bg-[#F3F3F3] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ShoppingCart size={20} />
                </button>

                <button
                    type="button"
                    aria-label="View product"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-[#252B42] transition-colors hover:bg-[#F3F3F3]"
                >
                    <Eye size={20} />
                </button>
            </div>
        </div>
    );
}

export default ProductInfo;
