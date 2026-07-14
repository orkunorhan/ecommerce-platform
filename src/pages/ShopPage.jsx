import { useEffect, useState, useRef } from "react";
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
    setOffset,
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

    const limit = useSelector(
        (state) => state.product.limit,
    );

    const offset = useSelector(
        (state) => state.product.offset,
    );

    const [filterInput, setFilterInput] = useState(filter);
    const [selectedSort, setSelectedSort] = useState(sort);
    const [viewMode, setViewMode] = useState("grid");

    const productsSectionRef = useRef(null);

    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    const firstVisibleProduct =
        products.length > 0 ? offset + 1 : 0;

    const lastVisibleProduct =
        products.length > 0
            ? Math.min(offset + products.length, total)
            : 0;

    useEffect(() => {
        dispatch(fetchProducts(categoryId)).catch(() => {
            // Failed state is handled through Redux.
        });
    }, [
        categoryId,
        filter,
        sort,
        limit,
        offset,
        dispatch,
    ]);



    const handleSortChange = (value) => {
        setSelectedSort(value);
    };

    const handleFilterInputChange = (value) => {
        setFilterInput(value);
    };

    const handleViewChange = (value) => {
        setViewMode(value);
    };

    const handleFilterClick = () => {
        dispatch(setFilter(filterInput.trim()));
        dispatch(setSort(selectedSort));
        dispatch(setOffset(0));
    };

    const handlePageChange = (page) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return;
        }

        dispatch(setOffset((page - 1) * limit));

        productsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <>
            <ShopHero />
            <TopCategories />

            <div
                ref={productsSectionRef}
                className="scroll-mt-6"
            >
                <ProductToolbar
                    firstVisibleProduct={firstVisibleProduct}
                    lastVisibleProduct={lastVisibleProduct}
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
            </div>

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
                        products={products}
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
