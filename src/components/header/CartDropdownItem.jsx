function CartDropdownItem({ cartItem }) {
    const { product, count } = cartItem;

    const productPrice = Number(product.price) || 0;
    const subtotal = productPrice * count;
    const imageUrl = product.images?.[0]?.url;

    const formattedSubtotal = subtotal.toLocaleString(
        "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        },
    );

    return (
        <div className="flex gap-4 border-b border-[#E6E6E6] px-5 py-4 last:border-b-0">
            <div className="h-20 w-[70px] shrink-0 overflow-hidden rounded border border-[#E6E6E6] bg-[#F5F5F5]">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center px-2 text-center text-xs font-semibold text-[#737373]">
                        No image
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-[#252B42]">
                    {product.name}
                </h3>

                <p className="mt-2 text-xs font-semibold text-[#737373]">
                    Quantity: {count}
                </p>

                <p className="mt-1 text-sm font-bold text-[#23A6F0]">
                    ${formattedSubtotal}
                </p>
            </div>
        </div>
    );
}

export default CartDropdownItem;
