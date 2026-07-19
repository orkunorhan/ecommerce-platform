import { Check, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import CartQuantityControl from "./CartQuantityControl";

import {
    decreaseCartItem,
    increaseCartItem,
    removeFromCart,
    toggleCartItem,
} from "../../store/actions/shoppingCartActions";

function ShoppingCartItem({ cartItem }) {
    const dispatch = useDispatch();

    const { checked, count, product } = cartItem;

    const productId = product.id;

    const productImage =
        product.images?.[0]?.url ??
        product.images?.[0] ??
        product.image ??
        "";

    const productPrice = Number(product.price ?? 0);
    const rowTotal = productPrice * count;

    const formattedProductPrice = productPrice.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const formattedRowTotal = rowTotal.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const handleToggle = () => {
        dispatch(toggleCartItem(productId));
    };

    const handleIncrease = () => {
        dispatch(increaseCartItem(productId));
    };

    const handleDecrease = () => {
        dispatch(decreaseCartItem(productId));
    };

    const handleRemove = () => {
        dispatch(removeFromCart(productId));
    };

    return (
        <article className="border-b border-[#E6E6E6] last:border-b-0">
            <div className="flex flex-col gap-5 px-5 py-5 xl:grid xl:grid-cols-[44px_minmax(280px,1fr)_132px_96px_96px_96px] xl:items-center xl:gap-x-4 xl:px-6 xl:py-6">
                <div className="flex items-center justify-between xl:justify-center">
                    <label className="group flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleToggle}
                            aria-label={`Select ${product.name}`}
                            className="peer sr-only"
                        />

                        <span
                            aria-hidden="true"
                            className="
                                flex h-5 w-5 shrink-0 items-center justify-center
                                rounded-[4px] border-2 border-[#23A6F0]
                                bg-white transition-all duration-150
                                group-hover:border-[#1C8ED8]
                                peer-checked:border-[#23A6F0]
                                peer-checked:bg-[#23A6F0]
                                peer-focus-visible:ring-2
                                peer-focus-visible:ring-[#23A6F0]/30
                                peer-focus-visible:ring-offset-2
                            "
                        >
                            <Check
                                size={14}
                                strokeWidth={3}
                                aria-hidden="true"
                                className={`text-white transition-opacity duration-150 ${checked
                                    ? "opacity-100"
                                    : "opacity-0"
                                    }`}
                            />
                        </span>
                    </label>

                    <button
                        type="button"
                        onClick={handleRemove}
                        aria-label={`Remove ${product.name} from cart`}
                        className="flex h-10 w-10 items-center justify-center rounded-md text-[#E74040] transition-colors hover:bg-[#FFF1F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E74040]/30 xl:hidden"
                    >
                        <Trash2
                            size={20}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div className="flex min-w-0 items-center gap-4">
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-md bg-[#F7F7F7] sm:h-28 sm:w-24">
                        {productImage ? (
                            <img
                                src={productImage}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center px-2 text-center text-xs font-semibold text-[#737373]">
                                No image
                            </div>
                        )}
                    </div>

                    <div className="min-w-0">
                        <h2 className="line-clamp-2 text-sm font-bold leading-6 text-[#252B42]">
                            {product.name}
                        </h2>

                        {product.description && (
                            <p className="mt-1 line-clamp-2 max-w-[300px] text-xs leading-5 text-[#737373]">
                                {product.description}
                            </p>
                        )}

                        {typeof product.stock === "number" && (
                            <p
                                className={`mt-2 text-xs font-semibold ${product.stock > 0
                                    ? "text-[#2DC071]"
                                    : "text-[#E74040]"
                                    }`}
                            >
                                {product.stock > 0
                                    ? `${product.stock} in stock`
                                    : "Out of stock"}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 xl:justify-center">
                    <span className="text-sm font-semibold text-[#737373] xl:hidden">
                        Quantity
                    </span>

                    <CartQuantityControl
                        count={count}
                        onDecrease={handleDecrease}
                        onIncrease={handleIncrease}
                    />
                </div>

                <div className="flex items-center justify-between gap-4 xl:justify-center">
                    <span className="text-sm font-semibold text-[#737373] xl:hidden">
                        Unit Price
                    </span>

                    <span className="whitespace-nowrap text-sm font-bold text-[#252B42]">
                        ${formattedProductPrice}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-4 xl:justify-center">
                    <span className="text-sm font-semibold text-[#737373] xl:hidden">
                        Total
                    </span>

                    <span className="whitespace-nowrap text-base font-bold text-[#252B42]">
                        ${formattedRowTotal}
                    </span>
                </div>

                <div className="hidden justify-center xl:flex">
                    <button
                        type="button"
                        onClick={handleRemove}
                        aria-label={`Remove ${product.name} from cart`}
                        className="flex h-10 w-10 items-center justify-center rounded-md text-[#E74040] transition-colors hover:bg-[#FFF1F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E74040]/30"
                    >
                        <Trash2
                            size={20}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ShoppingCartItem;
