function OrderSteps({
    currentStep,
    canAccessPayment,
    onStepChange,
}) {
    const isAddressStep = currentStep === 1;
    const isPaymentStep = currentStep === 2;

    return (
        <div className="overflow-hidden rounded-lg border border-[#E6E6E6] bg-white shadow-sm">
            <div className="grid grid-cols-2">
                <button
                    type="button"
                    onClick={() => onStepChange(1)}
                    aria-current={
                        isAddressStep ? "step" : undefined
                    }
                    className={`border-b-4 px-4 py-5 text-left transition-colors sm:px-6 ${isAddressStep
                        ? "border-[#23A6F0]"
                        : "border-[#2DC071]"
                        }`}
                >
                    <p
                        className={`text-sm font-bold sm:text-base ${isAddressStep
                            ? "text-[#23A6F0]"
                            : "text-[#2DC071]"
                            }`}
                    >
                        {isPaymentStep
                            ? "✓ 1. Address Information"
                            : "1. Address Information"}
                    </p>

                    <p className="mt-1 hidden text-xs text-[#737373] sm:block">
                        Shipping and billing address
                        selection
                    </p>
                </button>

                <button
                    type="button"
                    disabled={!canAccessPayment}
                    onClick={() => onStepChange(2)}
                    aria-current={
                        isPaymentStep ? "step" : undefined
                    }
                    className={`border-b-4 px-4 py-5 text-left transition-colors sm:px-6 ${isPaymentStep
                        ? "border-[#23A6F0]"
                        : "border-[#E6E6E6]"
                        } ${canAccessPayment
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        }`}
                >
                    <p
                        className={`text-sm font-bold sm:text-base ${isPaymentStep
                            ? "text-[#23A6F0]"
                            : canAccessPayment
                                ? "text-[#737373]"
                                : "text-[#BDBDBD]"
                            }`}
                    >
                        2. Payment Options
                    </p>

                    <p
                        className={`mt-1 hidden text-xs sm:block ${isPaymentStep
                            ? "text-[#737373]"
                            : "text-[#BDBDBD]"
                            }`}
                    >
                        Bank or credit card payment
                    </p>
                </button>
            </div>
        </div>
    );
}

export default OrderSteps;
