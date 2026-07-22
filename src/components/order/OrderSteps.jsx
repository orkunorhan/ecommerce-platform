function OrderSteps() {
    return (
        <div className="overflow-hidden rounded-lg border border-[#E6E6E6] bg-white shadow-sm">
            <div className="grid grid-cols-2">
                <div className="border-b-4 border-[#23A6F0] px-4 py-5 sm:px-6">
                    <p className="text-sm font-bold text-[#23A6F0] sm:text-base">
                        1. Address Information
                    </p>

                    <p className="mt-1 hidden text-xs text-[#737373] sm:block">
                        Shipping and billing address selection
                    </p>
                </div>

                <div className="border-b-4 border-[#E6E6E6] px-4 py-5 sm:px-6">
                    <p className="text-sm font-bold text-[#BDBDBD] sm:text-base">
                        2. Payment Options
                    </p>

                    <p className="mt-1 hidden text-xs text-[#BDBDBD] sm:block">
                        Bank or credit card payment
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OrderSteps;
