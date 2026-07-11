import {
    FaTwitter,
    FaFacebookSquare,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";

function TrialSection({ title, description, buttonText }) {
    return (
        <section className="bg-[#FAFAFA] px-6 py-20">
            <div className="mx-auto flex max-w-[607px] flex-col items-center text-center">
                <h2 className="text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] lg:text-[58px] lg:leading-[80px]">
                    {title}
                </h2>

                <p className="mt-8 text-xl leading-[30px] tracking-[0.2px] text-[#737373]">
                    {description}
                </p>

                <button className="mt-8 rounded-[5px] bg-[#23A6F0] px-10 py-[15px] text-sm font-bold tracking-[0.2px] text-white transition hover:bg-[#1b8ed1]">
                    {buttonText}
                </button>

                <div className="mt-10 flex items-center gap-[34px]">
                    <a href="#" aria-label="Twitter">
                        <FaTwitter
                            size={30}
                            className="text-[#23A6F0]"
                        />
                    </a>

                    <a href="#" aria-label="Facebook">
                        <FaFacebookSquare
                            size={30}
                            className="text-[#335BF5]"
                        />
                    </a>

                    <a href="#" aria-label="Instagram">
                        <FaInstagram
                            size={30}
                            className="text-[#E51F5A]"
                        />
                    </a>

                    <a href="#" aria-label="LinkedIn">
                        <FaLinkedin
                            size={30}
                            className="text-[#0A66C2]"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}

export default TrialSection;
