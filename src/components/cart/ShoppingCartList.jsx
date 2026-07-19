import ShoppingCartItem from "./ShoppingCartItem";

function ShoppingCartList({ cart }) {
    return (
        <>
            <div className="hidden grid-cols-[44px_minmax(280px,1fr)_132px_96px_96px_96px] items-center gap-x-4 border-b border-[#E6E6E6] bg-[#F7F7F7] px-6 py-4 text-sm font-bold text-[#737373] xl:grid">
                <span className="justify-self-center">Select</span>
                <span className="justify-self-center">Product</span>
                <span className="justify-self-center">Quantity</span>
                <span className="justify-self-center">Price</span>
                <span className="justify-self-center">Total</span>
                <span className="justify-self-center">Remove</span>
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