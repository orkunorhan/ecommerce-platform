import {
    Eye,
    Heart,
    ShoppingCart,
    Star,
} from "lucide-react";

function ProductInfo({ product }) {
    return (
        <div className="flex w-full flex-col text-left lg:max-w-[510px]">
            <h1 className="text-xl font-normal leading-[30px] tracking-[0.2px] text-[#252B42]">
                {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, index) => {
                        const isFilled = index < product.rating;

                        return (
                            <Star
                                key={index}
                                size={22}
                                fill={isFilled ? "#F3CD03" : "transparent"}
                                className="text-[#F3CD03]"
                            />
                        );
                    })}
                </div>

                <span className="text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                    {product.reviewCount} Reviews
                </span>
            </div>

            <p className="mt-5 text-2xl font-bold leading-8 tracking-[0.1px] text-[#252B42]">
                ${product.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </p>

            <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                    Availability :
                </span>

                <span className="text-sm font-bold leading-6 tracking-[0.2px] text-[#23A6F0]">
                    {product.availability}
                </span>
            </div>

            <p className="mt-8 max-w-[465px] font-semibold text-sm leading-5 tracking-[0.2px] text-[#858585] md:text-base md:leading-6">
                {product.description}
            </p>

            <div className="mt-7 h-px w-full bg-[#BDBDBD]" />

            <div className="mt-8 flex items-center gap-[10px]">
                {product.colors.map((color) => (
                    <button
                        key={color}
                        type="button"
                        aria-label={`Select ${color} color`}
                        className="h-[30px] w-[30px] rounded-full md:h-[40px] md:w-[40px]"
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            <div className="mt-16 flex items-center gap-[10px]">
                <button
                    type="button"
                    className="flex h-[44px] items-center justify-center rounded-[5px] bg-[#23A6F0] px-5 text-sm font-bold leading-[22px] tracking-[0.2px] text-white"
                >
                    Select Options
                </button>

                <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-[#252B42]"
                >
                    <Heart size={20} />
                </button>

                <button
                    type="button"
                    aria-label="Add to cart"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-[#252B42]"
                >
                    <ShoppingCart size={20} />
                </button>

                <button
                    type="button"
                    aria-label="View product"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-[#252B42]"
                >
                    <Eye size={20} />
                </button>
            </div>
        </div>
    );
}

export default ProductInfo;
