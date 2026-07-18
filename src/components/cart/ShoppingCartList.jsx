import ShoppingCartItem from "./ShoppingCartItem";

function ShoppingCartList({ cart }) {
    return (
        <>
            <div className="hidden grid-cols-[60px_1fr_180px_140px_140px_60px] items-center border-b border-[#E6E6E6] bg-[#F7F7F7] px-6 py-4 text-sm font-bold text-[#737373] lg:grid">
                <span>Select</span>
                <span>Product</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Total</span>
                <span className="text-center">Remove</span>
            </div>

            <div>
                {cart.map((cartItem) => (
                    <ShoppingCartItem
                        key={cartItem.product.id}
                        cartItem={cartItem}
                    />
                ))}
            </div>
        </>
    );
}

export default ShoppingCartList;
