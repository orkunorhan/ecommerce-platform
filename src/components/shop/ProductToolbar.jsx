import { ChevronDown, Grid2X2, List } from "lucide-react";

function ProductToolbar({
    showingCount,
    totalProducts,
    viewMode,
    sortBy,
    sortOptions,
    onViewChange,
    onSortChange,
    onFilterClick,
}) {
    return (
        <section className="flex w-full justify-center bg-white px-6 py-12">
            <div className="flex w-full max-w-[1050px] flex-col items-center gap-8 lg:flex-row lg:justify-between">
                <p className="text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                    Showing {showingCount} of {totalProducts} results
                </p>

                <div className="flex flex-col items-center gap-6 lg:flex-row">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                            Views:
                        </span>

                        <button
                            type="button"
                            aria-label="Grid view"
                            aria-pressed={viewMode === "grid"}
                            onClick={() => onViewChange("grid")}
                            className={`flex h-[46px] w-[46px] items-center justify-center rounded-[5px] border border-[#ECECEC] ${viewMode === "grid"
                                ? "text-[#23A6F0]"
                                : "text-[#737373]"
                                }`}
                        >
                            <Grid2X2 size={18} />
                        </button>

                        <button
                            type="button"
                            aria-label="List view"
                            aria-pressed={viewMode === "list"}
                            onClick={() => onViewChange("list")}
                            className={`flex h-[46px] w-[46px] items-center justify-center rounded-[5px] border border-[#ECECEC] ${viewMode === "list"
                                ? "text-[#23A6F0]"
                                : "text-[#737373]"
                                }`}
                        >
                            <List size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-[15px]">
                        <div className="relative flex">
                            <select
                                value={sortBy}
                                onChange={(event) =>
                                    onSortChange(event.target.value)
                                }
                                aria-label="Sort products"
                                className="h-[50px] min-w-[141px] appearance-none rounded-[5px] border border-[#DDDDDD] bg-white px-5 pr-10 text-sm leading-7 tracking-[0.2px] text-[#737373] outline-none"
                            >
                                {sortOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={16}
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#737373]"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={onFilterClick}
                            className="h-[50px] rounded-[5px] bg-[#23A6F0] px-5 text-sm font-bold leading-[22px] tracking-[0.2px] text-white"
                        >
                            Filter
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductToolbar;
