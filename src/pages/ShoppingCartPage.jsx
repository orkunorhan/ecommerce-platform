import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/cart/EmptyCart";
import OrderSummary from "../components/cart/OrderSummary";
import ShoppingCartList from "../components/cart/ShoppingCartList";

const SHIPPING_PRICE = 29.99;
const DISCOUNT = 0;

function ShoppingCartPage() {
    const history = useHistory();

    const handleCreateOrder = () => {
        history.push("/order");
    };

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

    const shippingPrice =
        selectedCartItems.length > 0
            ? SHIPPING_PRICE
            : 0;

    const grandTotal =
        selectedTotalPrice +
        shippingPrice -
        DISCOUNT;

    return (
        <section className="flex w-full flex-1 bg-[#FAFAFA] py-10 lg:py-14">
            <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
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
                    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
                        <div className="min-w-0 overflow-hidden rounded-lg border border-[#E6E6E6] bg-white shadow-sm">
                            <ShoppingCartList cart={cart} />
                        </div>

                        <OrderSummary
                            productsTotal={selectedTotalPrice}
                            shippingPrice={shippingPrice}
                            discount={DISCOUNT}
                            grandTotal={grandTotal}
                            selectedItemCount={selectedItemCount}
                            buttonText="Create Order"
                            buttonDisabled={selectedItemCount === 0}
                            onButtonClick={handleCreateOrder}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

export default ShoppingCartPage;
