import { ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import CartDropdownContent from "./CartDropdownContent";

function CartDropdown({
    mobile = false,
    onNavigate,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);

    const cart = useSelector(
        (state) => state.shoppingCart.cart,
    );

    const totalCartItemCount = cart.reduce(
        (total, cartItem) => total + cartItem.count,
        0,
    );

    const totalCartPrice = cart.reduce(
        (total, cartItem) => {
            const productPrice =
                Number(cartItem.product.price) || 0;

            return total + productPrice * cartItem.count;
        },
        0,
    );

    const handleNavigate = () => {
        setIsOpen(false);
        onNavigate?.();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside,
        );

        document.addEventListener(
            "keydown",
            handleEscapeKey,
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside,
            );

            document.removeEventListener(
                "keydown",
                handleEscapeKey,
            );
        };
    }, []);

    return (
        <div
            ref={dropdownRef}
            className={mobile ? "contents" : "relative"}
        >
            <button
                type="button"
                aria-label="Shopping cart"
                aria-expanded={isOpen}
                onClick={() =>
                    setIsOpen(
                        (previousValue) => !previousValue,
                    )
                }
                className={
                    mobile
                        ? "col-start-2 row-start-1 flex items-center justify-center gap-1"
                        : "flex items-center gap-[5px]"
                }
            >
                <ShoppingCart
                    size={mobile ? 26 : 18}
                    strokeWidth={mobile ? 1.8 : 2.5}
                />

                {totalCartItemCount > 0 && (
                    <span className="text-xs leading-4">
                        {totalCartItemCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div
                    className={
                        mobile
                            ? "col-span-3 col-start-1 row-start-2 mt-6 w-full text-[#252B42]"
                            : "absolute right-0 z-50 mt-2 w-80"
                    }
                >
                    <CartDropdownContent
                        cart={cart}
                        totalCartItemCount={
                            totalCartItemCount
                        }
                        totalCartPrice={totalCartPrice}
                        onNavigate={handleNavigate}
                    />
                </div>
            )}
        </div>
    );
}

export default CartDropdown;
