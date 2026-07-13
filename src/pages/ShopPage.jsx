import { useMemo, useState } from "react";
import Pagination from "../components/common/Pagination";
import ProductGrid from "../components/shop/ProductGrid";
import ProductToolbar from "../components/shop/ProductToolbar";
import ShopHero from "../components/shop/ShopHero";
import shopProducts from "../data/shopProducts";
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
    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("popularity");
    const [currentPage, setCurrentPage] = useState(1);

    const sortedProducts = useMemo(() => {
        const productsCopy = [...shopProducts];

        switch (sortBy) {
            case "price-low-to-high":
                return productsCopy.sort(
                    (firstProduct, secondProduct) =>
                        Number(firstProduct.discountedPrice) -
                        Number(secondProduct.discountedPrice)
                );

            case "price-high-to-low":
                return productsCopy.sort(
                    (firstProduct, secondProduct) =>
                        Number(secondProduct.discountedPrice) -
                        Number(firstProduct.discountedPrice)
                );

            case "name-a-to-z":
                return productsCopy.sort((firstProduct, secondProduct) =>
                    firstProduct.name.localeCompare(secondProduct.name)
                );

            case "popularity":
            default:
                return productsCopy.sort(
                    (firstProduct, secondProduct) =>
                        secondProduct.popularity -
                        firstProduct.popularity
                );
        }
    }, [sortBy]);

    const totalPages = Math.ceil(
        sortedProducts.length / productsPerPage
    );

    const displayedProducts = useMemo(() => {
        const startIndex =
            (currentPage - 1) * productsPerPage;

        const endIndex =
            startIndex + productsPerPage;

        return sortedProducts.slice(
            startIndex,
            endIndex
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
                totalProducts={sortedProducts.length}
                viewMode={viewMode}
                sortBy={sortBy}
                sortOptions={sortOptions}
                onViewChange={handleViewChange}
                onSortChange={handleSortChange}
                onFilterClick={handleFilterClick}
            />

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

            <BrandLogos background="gray" />
        </>
    );
}

export default ShopPage;
