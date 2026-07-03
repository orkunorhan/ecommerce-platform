function ProductPromoSection() {
    return (
        <section className="flex bg-white">
            <div className="flex w-full flex-col items-center lg:flex-row lg:justify-center">
                <div className="order-2 flex w-full justify-center lg:order-1 lg:w-[704px]">
                    <img
                        src="/images/promo-product-2.png"
                        alt="Neural Universe"
                        className="w-full max-w-[704px] object-contain"
                    />
                </div>

                <div className="order-1 flex w-full flex-col items-center px-8 py-20 text-center lg:order-2 lg:w-[573px] lg:items-start lg:px-0 lg:text-left">
                    <p className="text-xl font-bold uppercase leading-[30px] tracking-[0.2px] text-[#BDBDBD]">
                        Summer 2020
                    </p>

                    <h2 className="mt-[30px] max-w-[420px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] lg:text-[40px] lg:leading-[50px]">
                        Part of the Neural Universe
                    </h2>

                    <p className="mt-[30px] max-w-[360px] text-xl leading-[30px] tracking-[0.2px] text-[#737373]">
                        We know how large objects will act, but things on a small scale.
                    </p>

                    <div className="mt-[30px] flex flex-col gap-[25px] lg:flex-row">
                        <button
                            type="button"
                            className="rounded-[5px] bg-[#23A6F0] px-10 py-[15px] text-sm font-bold uppercase leading-[22px] tracking-[0.2px] text-white lg:bg-[#2DC071]"
                        >
                            Buy Now
                        </button>

                        <button
                            type="button"
                            className="rounded-[5px] border border-[#23A6F0] px-10 py-[15px] text-sm font-bold leading-[22px] tracking-[0.2px] text-[#23A6F0] lg:border-[#2DC071] lg:text-[#2DC071]"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductPromoSection;
