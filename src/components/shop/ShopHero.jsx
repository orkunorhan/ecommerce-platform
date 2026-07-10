import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ShopCategoryCard from "../common/ShopCategoryCard";
import shopCategories from "../../data/shopCategories";

function ShopHero() {
    return (
        <section className="flex flex-col bg-[#FAFAFA] px-10 py-10">
            <div className="mx-auto flex w-full max-w-[1088px] flex-col items-center gap-[30px] lg:flex-row lg:items-center lg:justify-between">
                <h1 className="text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42]">
                    Shop
                </h1>

                <div className="flex items-center gap-[15px]">
                    <Link
                        to="/"
                        className="text-sm font-bold leading-6 tracking-[0.2px] text-[#252B42]"
                    >
                        Home
                    </Link>

                    <ChevronRight size={16} className="text-[#BDBDBD]" />

                    <span className="text-sm font-bold leading-6 tracking-[0.2px] text-[#BDBDBD]">
                        Shop
                    </span>
                </div>
            </div>

            <div className="mx-auto mt-10 flex w-full max-w-[1088px] flex-col gap-[15px] lg:flex-row">
                {shopCategories.map((category) => (
                    <ShopCategoryCard key={category.id} category={category} />
                ))}
            </div>
        </section>
    );
}

export default ShopHero;
