function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    const getVisiblePages = () => {
        if (totalPages <= 7) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1,
            );
        }

        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, "end-ellipsis", totalPages];
        }

        if (currentPage >= totalPages - 3) {
            return [
                1,
                "start-ellipsis",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            1,
            "start-ellipsis",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "end-ellipsis",
            totalPages,
        ];
    };

    const visiblePages = getVisiblePages();

    return (
        <nav
            aria-label="Product pagination"
            className="flex flex-wrap items-center justify-center gap-1"
        >
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(1)}
                className="h-12 rounded-l-[5px] border border-[#E9E9E9] bg-white px-4 text-sm font-bold text-[#23A6F0] disabled:cursor-not-allowed disabled:text-[#BDBDBD]"
            >
                First
            </button>

            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="h-12 border border-[#E9E9E9] bg-white px-4 text-sm font-bold text-[#23A6F0] disabled:cursor-not-allowed disabled:text-[#BDBDBD]"
            >
                Previous
            </button>

            {visiblePages.map((page) => {
                if (
                    page === "start-ellipsis" ||
                    page === "end-ellipsis"
                ) {
                    return (
                        <span
                            key={page}
                            className="flex h-12 min-w-10 items-center justify-center border border-[#E9E9E9] bg-white px-2 text-sm font-bold text-[#737373]"
                        >
                            …
                        </span>
                    );
                }

                const isActive = page === currentPage;

                return (
                    <button
                        key={page}
                        type="button"
                        aria-label={`Go to page ${page}`}
                        aria-current={
                            isActive ? "page" : undefined
                        }
                        onClick={() => onPageChange(page)}
                        className={`h-12 min-w-12 border border-[#E9E9E9] px-3 text-sm font-bold ${isActive
                            ? "bg-[#23A6F0] text-white"
                            : "bg-white text-[#23A6F0] hover:bg-[#F5F5F5]"
                            }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="h-12 rounded-r-[5px] border border-[#E9E9E9] bg-white px-4 text-sm font-bold text-[#23A6F0] disabled:cursor-not-allowed disabled:text-[#BDBDBD]"
            >
                Next
            </button>
        </nav>
    );
}

export default Pagination;
