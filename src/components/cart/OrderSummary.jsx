function OrderSummary({
    productsTotal,
    shippingPrice,
    discount,
    grandTotal,
    selectedItemCount,
}) {
    const formatPrice = (price) =>
        Number(price).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <aside className="rounded-lg border border-[#E6E6E6] bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-2xl font-bold text-[#252B42]">
                Order Summary
            </h2>

            <p className="mt-2 text-sm text-[#737373]">
                {selectedItemCount} selected{" "}
                {selectedItemCount === 1 ? "item" : "items"}
            </p>

            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-[#737373]">
                        Products Total
                    </span>

                    <span className="text-sm font-bold text-[#252B42]">
                        ${formatPrice(productsTotal)}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-[#737373]">
                        Shipping
                    </span>

                    <span className="text-sm font-bold text-[#252B42]">
                        ${formatPrice(shippingPrice)}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-[#737373]">
                        Discount
                    </span>

                    <span className="text-sm font-bold text-[#2DC071]">
                        -${formatPrice(discount)}
                    </span>
                </div>
            </div>

            <div className="my-6 border-t border-[#E6E6E6]" />

            <div className="flex items-center justify-between gap-4">
                <span className="text-base font-bold text-[#252B42]">
                    Grand Total
                </span>

                <span className="text-xl font-bold text-[#252B42]">
                    ${formatPrice(grandTotal)}
                </span>
            </div>

            <button
                type="button"
                disabled
                className="mt-6 flex h-12 w-full cursor-not-allowed items-center justify-center rounded-md bg-[#23A6F0] px-6 text-sm font-bold text-white opacity-70"
            >
                Create Order
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-[#737373]">
                Order creation will be enabled in a later task.
            </p>
        </aside>
    );
}

export default OrderSummary;
