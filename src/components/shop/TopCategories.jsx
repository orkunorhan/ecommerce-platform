import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getCategoryPath } from "../../utils/categoryUtils";

function TopCategories() {
    const categories = useSelector(
        (state) => state.product.categories,
    );

    const topCategories = [...categories]
        .sort(
            (firstCategory, secondCategory) =>
                secondCategory.rating - firstCategory.rating,
        )
        .slice(0, 5);

    if (topCategories.length === 0) {
        return null;
    }

    return (
        <section className="w-full bg-[#FAFAFA]">
            <div className="mx-auto w-full max-w-[1124px] px-6 py-12 lg:px-0">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {topCategories.map((category) => (
                        <Link
                            key={category.id}
                            to={getCategoryPath(category)}
                            className="group relative block h-[300px] overflow-hidden bg-[#252B42] sm:h-[260px] lg:h-[223px]"
                        >
                            <img
                                src={category.img}
                                alt={`${category.title} category`}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />

                            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
                                <h2 className="text-base font-bold leading-6 tracking-[0.1px]">
                                    {category.title}
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-5">
                                    {category.gender === "k"
                                        ? "Kadın"
                                        : "Erkek"}
                                </p>

                                <p className="mt-1 text-sm font-bold leading-5">
                                    {category.rating.toFixed(1)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TopCategories;
