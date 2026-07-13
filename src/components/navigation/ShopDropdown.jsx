import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";

import { getCategoryPath } from "../../utils/categoryUtils";

function ShopDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const categories = useSelector(
        (state) => state.product.categories,
    );

    const womenCategories = categories.filter(
        (category) => category.gender === "k",
    );

    const menCategories = categories.filter(
        (category) => category.gender === "e",
    );

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <Link
                to="/shop"
                onClick={closeDropdown}
                className="flex items-center gap-1 text-sm font-bold leading-6 text-[#252B42]"
            >
                Shop

                <ChevronDown
                    size={14}
                    strokeWidth={2.5}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </Link>

            <div
                className={`absolute left-1/2 top-full z-50 min-w-[340px] -translate-x-1/2 pt-4 transition-all duration-200 ${isOpen
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    }`}
            >
                <div className="grid grid-cols-2 gap-12 bg-white px-8 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                    <CategoryColumn
                        title="Kadın"
                        categories={womenCategories}
                        onNavigate={closeDropdown}
                    />

                    <CategoryColumn
                        title="Erkek"
                        categories={menCategories}
                        onNavigate={closeDropdown}
                    />
                </div>
            </div>
        </div>
    );
}

function CategoryColumn({
    title,
    categories,
    onNavigate,
}) {
    return (
        <div className="flex min-w-[110px] flex-col">
            <h3 className="mb-5 text-sm font-bold leading-6 text-[#252B42]">
                {title}
            </h3>

            <div className="flex flex-col gap-4">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        to={getCategoryPath(category)}
                        onClick={onNavigate}
                        className="text-sm font-semibold leading-5 text-[#737373] transition-colors hover:text-[#23A6F0]"
                    >
                        {category.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ShopDropdown;
