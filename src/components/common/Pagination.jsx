function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    const pages = Array.from(
        { length: totalPages },
        (_, index) => index + 1,
    );

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handleFirstPage = () => {
        if (!isFirstPage) {
            onPageChange(1);
        }
    };

    const handleNextPage = () => {
        if (!isLastPage) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <nav
            aria-label="Product pagination"
            className="flex items-center justify-center"
        >
            <button
                type="button"
                onClick={handleFirstPage}
                disabled={isFirstPage}
                className={`flex h-[74px] items-center justify-center rounded-l-[7px] border border-[#E9E9E9] px-[25px] text-sm font-bold leading-6 tracking-[0.2px] ${isFirstPage
                        ? "cursor-not-allowed bg-[#F3F3F3] text-[#BDBDBD]"
                        : "bg-white text-[#23A6F0] hover:bg-[#F3F3F3]"
                    }`}
            >
                First
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`flex h-[74px] w-[49px] items-center justify-center border-y border-r border-[#E9E9E9] text-sm font-bold leading-6 tracking-[0.2px] ${currentPage === page
                            ? "bg-[#23A6F0] text-white"
                            : "bg-white text-[#23A6F0] hover:bg-[#F3F3F3]"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                onClick={handleNextPage}
                disabled={isLastPage}
                className={`flex h-[74px] items-center justify-center rounded-r-[7px] border-y border-r border-[#E9E9E9] px-[25px] text-sm font-bold leading-6 tracking-[0.2px] ${isLastPage
                        ? "cursor-not-allowed bg-[#F3F3F3] text-[#BDBDBD]"
                        : "bg-white text-[#23A6F0] hover:bg-[#F3F3F3]"
                    }`}
            >
                Next
            </button>
        </nav>
    );
}

export default Pagination;
