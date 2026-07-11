function ContactHero({
    title,
    description,
    actionText,
    actionHref,
    backgroundImage,
}) {
    return (
        <section
            className="flex min-h-[520px] w-full items-center justify-center bg-cover bg-center px-8 py-20 lg:min-h-[446px]"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="flex max-w-[620px] flex-col items-center text-center">
                <h1 className="max-w-[420px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] lg:max-w-none">
                    {title}
                </h1>

                <p className="mt-[30px] max-w-[350px] text-base leading-6 tracking-[0.2px] text-[#737373] lg:max-w-[470px]">
                    {description}
                </p>

                <a
                    href={actionHref}
                    className="mt-[30px] text-sm font-bold uppercase leading-6 tracking-[0.2px] text-[#23A6F0]"
                >
                    {actionText}
                </a>
            </div>
        </section>
    );
}

export default ContactHero;
