import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle } from "lucide-react";
import Pagination from "../components/common/Pagination";
import ProductGrid from "../components/shop/ProductGrid";
import ProductToolbar from "../components/shop/ProductToolbar";
import ShopHero from "../components/shop/ShopHero";
//import shopProducts from "../data/shopProducts";
import { fetchProducts } from "../store/actions/productActions";
import BrandLogos from "../components/common/BrandLogos";
import TopCategories from "../components/shop/TopCategories";

const sortOptions = [
    {
        value: "popularity",
        label: "Popularity",
    },
    {
        value: "price-low-to-high",
        label: "Price: Low to High",
    },
    {
        value: "price-high-to-low",
        label: "Price: High to Low",
    },
    {
        value: "name-a-to-z",
        label: "Name: A to Z",
    },
];

const productsPerPage = 4;

function ShopPage() {
    const dispatch = useDispatch();

    const products = useSelector(
        (state) => state.product.productList,
    );

    const total = useSelector(
        (state) => state.product.total,
    );

    const fetchState = useSelector(
        (state) => state.product.fetchState,
    );

    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("popularity");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts()).catch(() => {
            // Failed state is handled through Redux.
        });
    }, [dispatch]);

    const sortedProducts = useMemo(() => {
        const productsCopy = [...products];

        switch (sortBy) {
            case "price-low-to-high":
                return productsCopy.sort(
                    (firstProduct, secondProduct) =>
                        Number(firstProduct.price) -
                        Number(secondProduct.price),
                );

            case "price-high-to-low":
                return productsCopy.sort(
                    (firstProduct, secondProduct) =>
                        Number(secondProduct.price) -
                        Number(firstProduct.price),
                );

            case "name-a-to-z":
                return productsCopy.sort(
                    (firstProduct, secondProduct) =>
                        firstProduct.name.localeCompare(
                            secondProduct.name,
                            "tr",
                        ),
                );

            case "popularity":
            default:
                return productsCopy.sort(
                    (firstProduct, secondProduct) =>
                        secondProduct.sell_count -
                        firstProduct.sell_count,
                );
        }
    }, [products, sortBy]);

    const totalPages = Math.ceil(
        sortedProducts.length / productsPerPage,
    );

    const displayedProducts = useMemo(() => {
        const startIndex =
            (currentPage - 1) * productsPerPage;

        const endIndex =
            startIndex + productsPerPage;

        return sortedProducts.slice(
            startIndex,
            endIndex,
        );
    }, [currentPage, sortedProducts]);

    const handleSortChange = (value) => {
        setSortBy(value);
        setCurrentPage(1);
    };

    const handleViewChange = (value) => {
        setViewMode(value);
        setCurrentPage(1);
    };

    const handleFilterClick = () => { };

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
                sortBy={sortBy}
                sortOptions={sortOptions}
                onViewChange={handleViewChange}
                onSortChange={handleSortChange}
                onFilterClick={handleFilterClick}
            />

            {fetchState === "FETCHING" && (
                <section className="flex min-h-[320px] items-center justify-center bg-white">
                    <LoaderCircle
                        aria-hidden="true"
                        className="h-10 w-10 animate-spin text-[#23A6F0]"
                    />
                </section>
            )}

            {fetchState === "FAILED" && (
                <section
                    role="alert"
                    className="flex min-h-[260px] items-center justify-center bg-white px-6 text-center"
                >
                    <p className="text-base font-semibold text-[#E74040]">
                        Products could not be loaded. Please try again.
                    </p>
                </section>
            )}

            {fetchState === "FETCHING" && products.length === 0 && (
                <section className="flex min-h-[320px] items-center justify-center bg-white">
                    <LoaderCircle
                        aria-hidden="true"
                        className="h-10 w-10 animate-spin text-[#23A6F0]"
                    />
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
