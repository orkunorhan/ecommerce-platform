import { useMemo, useState } from "react";
import ProductGrid from "../components/shop/ProductGrid";
import ProductToolbar from "../components/shop/ProductToolbar";
import ShopHero from "../components/shop/ShopHero";
import shopProducts from "../data/shopProducts";

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

function ShopPage() {
    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("popularity");

    const displayedProducts = useMemo(() => {
        const productsCopy = [...shopProducts];

        switch (sortBy) {
            case "price-low-to-high":
                return productsCopy.sort(
                    (firstProduct, secondProduct) =>
                        Number(firstProduct.discountedPrice) -
                        Number(secondProduct.discountedPrice),
                );

            case "price-high-to-low":
                return productsCopy.sort(
                    (firstProduct, secondProduct) =>
                        Number(secondProduct.discountedPrice) -
                        Number(firstProduct.discountedPrice),
                );

            case "name-a-to-z":
                return productsCopy.sort((firstProduct, secondProduct) =>
                    firstProduct.name.localeCompare(secondProduct.name),
                );

            case "popularity":
            default:
                return productsCopy.sort(
                    (firstProduct, secondProduct) =>
                        secondProduct.popularity - firstProduct.popularity,
                );
        }
    }, [sortBy]);

    const handleFilterClick = () => {
        // Gerçek filtreleme ilerleyen Kanban görevinde eklenecek.
    };

    return (
        <>
            <ShopHero />

            <ProductToolbar
                totalProducts={displayedProducts.length}
                viewMode={viewMode}
                sortBy={sortBy}
                sortOptions={sortOptions}
                onViewChange={setViewMode}
                onSortChange={setSortBy}
                onFilterClick={handleFilterClick}
            />

            <ProductGrid
                products={displayedProducts}
                viewMode={viewMode}
            />
        </>
    );
}

export default ShopPage;
