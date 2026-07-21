function CreateOrderPage() {
    return (
        <section className="flex w-full flex-1 bg-[#FAFAFA] py-10 lg:py-14">
            <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold leading-tight text-[#252B42]">
                        Create Order
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-[#737373]">
                        Select your delivery and billing addresses to
                        continue with payment.
                    </p>
                </div>

                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
                    <div className="min-w-0">
                        <div className="overflow-hidden rounded-lg border border-[#E6E6E6] bg-white shadow-sm">
                            <div className="grid grid-cols-2">
                                <div className="border-b-4 border-[#23A6F0] px-6 py-5">
                                    <p className="font-bold text-[#23A6F0]">
                                        1. Address Information
                                    </p>

                                    <p className="mt-1 text-xs text-[#737373]">
                                        Shipping and billing address selection
                                    </p>
                                </div>

                                <div className="border-b-4 border-[#E6E6E6] px-6 py-5">
                                    <p className="font-bold text-[#BDBDBD]">
                                        2. Payment Options
                                    </p>

                                    <p className="mt-1 text-xs text-[#BDBDBD]">
                                        Bank or credit card payment
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 rounded-lg border border-[#E6E6E6] bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-[#252B42]">
                                Delivery Address
                            </h2>

                            <p className="mt-2 text-sm text-[#737373]">
                                Your saved addresses will be displayed here.
                            </p>
                        </div>
                    </div>

                    <aside className="rounded-lg border border-[#E6E6E6] bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-[#252B42]">
                            Order Summary
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-[#737373]">
                            Your selected products and order totals will be
                            displayed here.
                        </p>

                        <button
                            type="button"
                            disabled
                            className="mt-6 h-12 w-full cursor-not-allowed rounded-md bg-[#BDBDBD] text-sm font-bold text-white"
                        >
                            Save and Continue
                        </button>
                    </aside>
                </div>
            </div>
        </section>
    );
}

export default CreateOrderPage;
