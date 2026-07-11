import contactArrow from "../../assets/contact-arrow.svg";

function ContactCallToAction() {
    return (
        <section
            id="contact-form"
            className="flex w-full justify-center bg-[#FAFAFA] px-6 py-20 lg:py-24"
        >
            <div className="flex flex-col items-center text-center">
                <img
                    src={contactArrow}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-[75px] object-contain"
                />

                <p className="mt-4 text-sm font-bold uppercase leading-6 tracking-[0.2px] text-[#252B42]">
                    We Can&apos;t Wait To Meet You
                </p>

                <h2 className="mt-5 text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] lg:text-[58px] lg:leading-[80px]">
                    Let&apos;s Talk
                </h2>

                <button
                    type="button"
                    className="mt-7 rounded-[5px] bg-[#23A6F0] px-10 py-[15px] text-sm font-bold leading-[22px] tracking-[0.2px] text-white"
                >
                    Try it free now
                </button>
            </div>
        </section>
    );
}

export default ContactCallToAction;
