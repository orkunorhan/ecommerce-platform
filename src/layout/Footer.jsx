import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const footerColumns = [
    {
        title: "Company Info",
        links: ["About Us", "Carrier", "We are hiring", "Blog"],
    },
    {
        title: "Legal",
        links: ["About Us", "Carrier", "We are hiring", "Blog"],
    },
    {
        title: "Features",
        links: [
            "Business Marketing",
            "User Analytic",
            "Live Chat",
            "Unlimited Support",
        ],
    },
    {
        title: "Resources",
        links: ["IOS & Android", "Watch a Demo", "Customers", "API"],
    },
];

function Footer() {
    const { pathname } = useLocation();

    const isHomePage = pathname === "/";

    const topBackgroundClassName = isHomePage
        ? "bg-[#FAFAFA]"
        : "bg-white";

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <footer className="flex w-full flex-col bg-white">
            <div className={`w-full ${topBackgroundClassName}`}>
                <div className="mx-auto flex w-full max-w-[1050px] flex-col gap-6 px-10 py-10 lg:flex-row lg:items-center lg:justify-between lg:border-b lg:border-[#E6E6E6]">
                    <h2 className="text-2xl font-bold leading-8 tracking-[0.1px] text-[#252B42]">
                        Bandage
                    </h2>

                    <div className="flex items-center gap-5 text-[#23A6F0]">
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="flex items-center justify-center"
                        >
                            <FaFacebook size={24} />
                        </a>

                        <a
                            href="#"
                            aria-label="Instagram"
                            className="flex items-center justify-center"
                        >
                            <FaInstagram size={24} />
                        </a>

                        <a
                            href="#"
                            aria-label="Twitter"
                            className="flex items-center justify-center"
                        >
                            <FaTwitter size={24} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white">
                <div className="mx-auto flex w-full max-w-[1050px] flex-col gap-[30px] px-10 py-[50px] lg:flex-row lg:justify-between">
                    {footerColumns.map((column) => (
                        <div
                            key={column.title}
                            className="flex flex-col"
                        >
                            <h3 className="text-base font-bold leading-6 tracking-[0.1px] text-[#252B42]">
                                {column.title}
                            </h3>

                            <div className="mt-5 flex flex-col gap-[10px]">
                                {column.links.map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex flex-col">
                        <h3 className="text-base font-bold leading-6 tracking-[0.1px] text-[#252B42]">
                            Get In Touch
                        </h3>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-5 flex h-[58px] w-full max-w-[321px] overflow-hidden rounded-[5px] border border-[#E6E6E6]"
                        >
                            <input
                                type="email"
                                placeholder="Your Email"
                                aria-label="Email address"
                                className="min-w-0 flex-1 bg-[#F9F9F9] px-5 text-sm leading-7 tracking-[0.2px] text-[#737373] outline-none"
                            />

                            <button
                                type="submit"
                                className="bg-[#23A6F0] px-[22px] text-sm leading-7 tracking-[0.2px] text-white"
                            >
                                Subscribe
                            </button>
                        </form>

                        <p className="mt-[10px] text-xs leading-7 tracking-[0.2px] text-[#737373]">
                            Lore imp sum dolor Amit
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#FAFAFA]">
                <div className="mx-auto flex w-full max-w-[1050px] justify-center px-10 py-[25px] lg:justify-start">
                    <p className="text-center text-sm font-bold leading-6 tracking-[0.2px] text-[#737373] lg:text-left">
                        Made With Love By
                        <br className="lg:hidden" />
                        <span className="lg:ml-1">
                            Finland All Right Reserved
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
