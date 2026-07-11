import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function TeamHero({
    eyebrow,
    titleFirstLine,
    titleSecondLine,
    breadcrumb,
}) {
    return (
        <section className="flex w-full justify-center bg-white px-6 py-20 lg:py-24">
            <div className="flex w-full max-w-[1050px] flex-col items-center text-center">
                <p className="text-base font-bold uppercase leading-6 tracking-[0.1px] text-[#737373]">
                    {eyebrow}
                </p>

                <h1 className="mt-6 text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] lg:text-[58px] lg:leading-[80px]">
                    <span className="block lg:inline">
                        {titleFirstLine}
                    </span>

                    <span className="block lg:ml-3 lg:inline">
                        {titleSecondLine}
                    </span>
                </h1>

                <nav
                    aria-label="Breadcrumb"
                    className="mt-10 flex items-center gap-[15px]"
                >
                    <Link
                        to="/"
                        className="text-sm font-bold leading-6 tracking-[0.2px] text-[#252B42]"
                    >
                        {breadcrumb.homeLabel}
                    </Link>

                    <ChevronRight
                        size={20}
                        strokeWidth={1.5}
                        className="text-[#BDBDBD]"
                    />

                    <span className="text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                        {breadcrumb.currentLabel}
                    </span>
                </nav>
            </div>
        </section>
    );
}

export default TeamHero;
