import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

import Pagination from "../components/common/Pagination";
import BrandLogos from "../components/common/BrandLogos";
import ProductGrid from "../components/shop/ProductGrid";
import ProductToolbar from "../components/shop/ProductToolbar";
import ShopHero from "../components/shop/ShopHero";
import TopCategories from "../components/shop/TopCategories";
import {
    fetchProducts,
    setFilter,
    setSort,
} from "../store/actions/productActions";

const sortOptions = [
    {
        value: "",
        label: "Sort by",
    },
    {
        value: "price:asc",
        label: "Price: Low to High",
    },
    {
        value: "price:desc",
        label: "Price: High to Low",
    },
    {
        value: "rating:asc",
        label: "Rating: Low to High",
    },
    {
        value: "rating:desc",
        label: "Rating: High to Low",
    },
];

const productsPerPage = 4;

function ShopPage() {
    const { categoryId } = useParams();
    const dispatch = useDispatch();

    const products = useSelector(
        (state) => state.product.productList,
    );

    const total = useSelector(
        (state) => state.product.total,
    );

    const filter = useSelector(
        (state) => state.product.filter,
    );

    const sort = useSelector(
        (state) => state.product.sort,
    );

    const fetchState = useSelector(
        (state) => state.product.fetchState,
    );

    const [filterInput, setFilterInput] = useState(filter);
    const [selectedSort, setSelectedSort] = useState(sort);
    const [viewMode, setViewMode] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts(categoryId)).catch(() => {
            // Failed state is handled through Redux.
        });
    }, [categoryId, filter, sort, dispatch]);

    const totalPages = Math.ceil(
        products.length / productsPerPage,
    );

    const startIndex =
        (currentPage - 1) * productsPerPage;

    const endIndex =
        startIndex + productsPerPage;

    const displayedProducts = products.slice(
        startIndex,
        endIndex,
    );

    const handleSortChange = (value) => {
        setSelectedSort(value);
    };

    const handleFilterInputChange = (value) => {
        setFilterInput(value);
    };

    const handleViewChange = (value) => {
        setViewMode(value);
        setCurrentPage(1);
    };

    const handleFilterClick = () => {
        dispatch(setFilter(filterInput.trim()));
        dispatch(setSort(selectedSort));
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) {
            return;
        }

        setCurrentPage(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <ShopHero />
            <TopCategories />

            <ProductToolbar
                showingCount={products.length}
                totalProducts={total}
                viewMode={viewMode}
                sortBy={selectedSort}
                sortOptions={sortOptions}
                filterInput={filterInput}
                onViewChange={handleViewChange}
                onSortChange={handleSortChange}
                onFilterInputChange={handleFilterInputChange}
                onFilterClick={handleFilterClick}
            />

            {fetchState === "FETCHING" &&
                products.length === 0 && (
                    <section className="flex min-h-[320px] items-center justify-center bg-white">
                        <LoaderCircle
                            aria-hidden="true"
                            className="h-10 w-10 animate-spin text-[#23A6F0]"
                        />
                    </section>
                )}

            {fetchState === "FAILED" &&
                products.length === 0 && (
                    <section
                        role="alert"
                        className="flex min-h-[260px] items-center justify-center bg-white px-6 text-center"
                    >
                        <p className="text-base font-semibold text-[#E74040]">
                            Products could not be loaded. Please try
                            again.
                        </p>
                    </section>
                )}

            {fetchState === "FETCHED" &&
                products.length === 0 && (
                    <section className="flex min-h-[260px] items-center justify-center bg-white px-6 text-center">
                        <p className="text-base font-semibold text-[#737373]">
                            No products were found.
                        </p>
                    </section>
                )}

            {products.length > 0 && (
                <>
                    <ProductGrid
                        products={displayedProducts}
                        viewMode={viewMode}
                    />

                    {totalPages > 1 && (
                        <section className="flex w-full justify-center bg-white px-6 pb-20">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </section>
                    )}
                </>
            )}

            <BrandLogos background="gray" />
        </>
    );
}

export default ShopPage;
