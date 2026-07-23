function OrderSummary({
    productsTotal,
    shippingPrice,
    discount,
    grandTotal,
    selectedItemCount,
    buttonText = "Create Order",
    buttonDisabled = false,
    onButtonClick,
    helperText,
    showAgreement = false,
    agreementAccepted = false,
    onAgreementChange,
}) {
    const formatPrice = (price) =>
        Number(price).toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            },
        );

    const handleAgreementChange = (
        event,
    ) => {
        onAgreementChange?.(
            event.target.checked,
        );
    };

    return (
        <aside className="rounded-lg border border-[#E6E6E6] bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-2xl font-bold text-[#252B42]">
                Order Summary
            </h2>

            <p className="mt-2 text-sm text-[#737373]">
                {selectedItemCount} selected{" "}
                {selectedItemCount === 1
                    ? "item"
                    : "items"}
            </p>

            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-[#737373]">
                        Products Total
                    </span>

                    <span className="text-sm font-bold text-[#252B42]">
                        $
                        {formatPrice(
                            productsTotal,
                        )}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-[#737373]">
                        Shipping
                    </span>

                    <span className="text-sm font-bold text-[#252B42]">
                        $
                        {formatPrice(
                            shippingPrice,
                        )}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-[#737373]">
                        Discount
                    </span>

                    <span className="text-sm font-bold text-[#2DC071]">
                        -$
                        {formatPrice(discount)}
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

            {showAgreement && (
                <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-md border border-[#E6E6E6] bg-[#FAFAFA] p-4">
                    <input
                        type="checkbox"
                        checked={
                            agreementAccepted
                        }
                        onChange={
                            handleAgreementChange
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#23A6F0]"
                    />

                    <span className="text-xs leading-5 text-[#737373]">
                        I have read and accept
                        the{" "}
                        <span className="font-bold text-[#23A6F0]">
                            Distance Sales
                            Agreement
                        </span>{" "}
                        and{" "}
                        <span className="font-bold text-[#23A6F0]">
                            Preliminary
                            Information Form
                        </span>
                        .
                    </span>
                </label>
            )}

            <button
                type="button"
                onClick={onButtonClick}
                disabled={buttonDisabled}
                className="mt-6 flex h-12 w-full items-center justify-center rounded-[5px] bg-[#23A6F0] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1B8ED1] disabled:cursor-not-allowed disabled:bg-[#BDBDBD] disabled:hover:bg-[#BDBDBD]"
            >
                {buttonText}
            </button>

            {helperText && (
                <p className="mt-3 text-center text-xs leading-5 text-[#737373]">
                    {helperText}
                </p>
            )}
        </aside>
    );
}

export default OrderSummary;
