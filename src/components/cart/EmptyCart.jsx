import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyCart() {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-lg border border-[#E6E6E6] bg-white px-6 py-12 text-center shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF6FD] text-[#23A6F0]">
                <ShoppingCart
                    size={38}
                    strokeWidth={1.7}
                    aria-hidden="true"
                />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#252B42]">
                Your shopping cart is empty
            </h2>

            <p className="mt-3 max-w-[460px] text-sm leading-6 text-[#737373]">
                Browse the shop and add products to your cart to see them
                here.
            </p>

            <Link
                to="/shop"
                className="mt-7 inline-flex h-12 items-center justify-center rounded-md bg-[#23A6F0] px-7 text-sm font-bold text-white transition-opacity hover:opacity-80"
            >
                Continue Shopping
            </Link>
        </div>
    );
}

export default EmptyCart;
