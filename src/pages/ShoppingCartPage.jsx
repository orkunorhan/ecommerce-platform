import { useSelector } from "react-redux";

import EmptyCart from "../components/cart/EmptyCart";
import ShoppingCartList from "../components/cart/ShoppingCartList";

function ShoppingCartPage() {
    const cart = useSelector(
        (state) => state.shoppingCart.cart,
    );

    const selectedCartItems = cart.filter(
        (cartItem) => cartItem.checked,
    );

    const selectedItemCount = selectedCartItems.reduce(
        (total, cartItem) => total + cartItem.count,
        0,
    );

    const selectedTotalPrice = selectedCartItems.reduce(
        (total, cartItem) =>
            total +
            Number(cartItem.product.price ?? 0) *
            cartItem.count,
        0,
    );

    const formattedSelectedTotalPrice =
        selectedTotalPrice.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <section className="flex w-full flex-1 bg-[#FAFAFA] py-10 lg:py-14">
            <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold leading-tight text-[#252B42]">
                        Shopping Cart
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-[#737373]">
                        Review your products, update quantities, and
                        select the items you want to order.
                    </p>
                </div>

                {cart.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="overflow-hidden rounded-lg border border-[#E6E6E6] bg-white shadow-sm">
                        <ShoppingCartList cart={cart} />

                        <div className="flex flex-col gap-4 border-t border-[#E6E6E6] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <div>
                                <p className="text-sm font-semibold text-[#737373]">
                                    Selected items
                                </p>

                                <p className="mt-1 text-sm font-bold text-[#252B42]">
                                    {selectedItemCount}{" "}
                                    {selectedItemCount === 1
                                        ? "item"
                                        : "items"}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-8 sm:justify-end">
                                <span className="text-sm font-bold text-[#737373]">
                                    Selected Total
                                </span>

                                <span className="text-xl font-bold text-[#252B42]">
                                    ${formattedSelectedTotalPrice}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ShoppingCartPage;
