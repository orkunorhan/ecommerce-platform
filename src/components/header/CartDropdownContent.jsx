import { ShoppingCart } from "lucide-react";
import CartDropdownItem from "./CartDropdownItem";

function CartDropdownContent({
    cart,
    totalCartItemCount,
    totalCartPrice,
}) {
    const formattedTotalPrice = totalCartPrice.toLocaleString(
        "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        },
    );

    return (
        <div className="overflow-hidden rounded-md border border-[#E6E6E6] bg-white text-left text-[#252B42] shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <div className="border-b border-[#E6E6E6] px-5 py-4">
                <h2 className="text-base font-bold leading-6">
                    My Cart ({totalCartItemCount}{" "}
                    {totalCartItemCount === 1
                        ? "Item"
                        : "Items"}
                    )
                </h2>
            </div>

            {cart.length === 0 ? (
                <div className="px-5 py-8 text-center">
                    <ShoppingCart
                        size={36}
                        strokeWidth={1.5}
                        className="mx-auto text-[#737373]"
                    />

                    <p className="mt-3 text-sm font-semibold text-[#737373]">
                        Your shopping cart is empty.
                    </p>
                </div>
            ) : (
                <>
                    <div className="max-h-[360px] overflow-y-auto">
                        {cart.map((cartItem) => (
                            <CartDropdownItem
                                key={cartItem.product.id}
                                cartItem={cartItem}
                            />
                        ))}
                    </div>

                    <div className="border-t border-[#E6E6E6] px-5 py-4">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-sm font-bold text-[#737373]">
                                Total
                            </span>

                            <span className="text-base font-bold text-[#252B42]">
                                ${formattedTotalPrice}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="h-11 rounded-[5px] border border-[#23A6F0] text-sm font-bold text-[#23A6F0] transition-colors hover:bg-[#EAF6FD]"
                            >
                                View Cart
                            </button>

                            <button
                                type="button"
                                className="h-11 rounded-[5px] bg-[#23A6F0] text-sm font-bold text-white transition-opacity hover:opacity-80"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartDropdownContent;
