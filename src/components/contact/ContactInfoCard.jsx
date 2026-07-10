function ContactInfoCard({ item }) {
    const Icon = item.icon;

    return (
        <article
            className={`flex min-h-[403px] w-full max-w-[328px] flex-col items-center justify-center px-8 py-12 text-center lg:min-h-[403px] ${item.highlighted
                    ? "bg-[#252B42] text-white"
                    : "bg-white text-[#252B42]"
                }`}
        >
            <Icon
                size={72}
                strokeWidth={1.8}
                className="text-[#23A6F0]"
            />

            <div className="mt-8 flex flex-col items-center">
                {item.emails.map((email) => (
                    <a
                        key={email}
                        href={`mailto:${email}`}
                        className={`text-sm font-bold leading-6 tracking-[0.2px] ${item.highlighted
                                ? "text-white"
                                : "text-[#252B42]"
                            }`}
                    >
                        {email}
                    </a>
                ))}
            </div>

            <h3
                className={`mt-4 text-base font-bold leading-6 tracking-[0.1px] ${item.highlighted
                        ? "text-white"
                        : "text-[#252B42]"
                    }`}
            >
                {item.title}
            </h3>

            <button
                type="button"
                className="mt-5 rounded-[5px] border border-[#23A6F0] px-8 py-[15px] text-sm font-bold leading-[22px] tracking-[0.2px] text-[#23A6F0]"
            >
                {item.buttonText}
            </button>
        </article>
    );
}

export default ContactInfoCard;
