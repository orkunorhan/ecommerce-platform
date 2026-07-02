import ProductCard from "../ProductCard";

const products = [
    {
        id: 1,
        image: "/images/product-1.jpg",
        name: "Graphic Design",
        category: "English Department",
        price: "16.48",
        discountedPrice: "6.48",
        colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
    },
    {
        id: 2,
        image: "/images/product-2.jpg",
        name: "Graphic Design",
        category: "English Department",
        price: "16.48",
        discountedPrice: "6.48",
        colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
    },
    {
        id: 3,
        image: "/images/product-3.jpg",
        name: "Graphic Design",
        category: "English Department",
        price: "16.48",
        discountedPrice: "6.48",
        colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
    },
    {
        id: 4,
        image: "/images/product-4.jpg",
        name: "Graphic Design",
        category: "English Department",
        price: "16.48",
        discountedPrice: "6.48",
        colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
    },
    {
        id: 5,
        image: "/images/product-5.jpg",
        name: "Graphic Design",
        category: "English Department",
        price: "16.48",
        discountedPrice: "6.48",
        colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
    },
    {
        id: 6,
        image: "/images/product-6.jpg",
        name: "Graphic Design",
        category: "English Department",
        price: "16.48",
        discountedPrice: "6.48",
        colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
    },
    {
        id: 7,
        image: "/images/product-7.jpg",
        name: "Graphic Design",
        category: "English Department",
        price: "16.48",
        discountedPrice: "6.48",
        colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
    },
    {
        id: 8,
        image: "/images/product-8.jpg",
        name: "Graphic Design",
        category: "English Department",
        price: "16.48",
        discountedPrice: "6.48",
        colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
    },
];

function BestsellerProducts() {
    return (
        <section className="flex flex-col items-center bg-white px-10 py-20">
            <div className="flex flex-col items-center text-center">
                <p className="text-xl leading-[30px] tracking-[0.2px] text-[#737373]">
                    Featured Products
                </p>

                <h2 className="mt-[10px] text-2xl font-bold uppercase leading-8 tracking-[0.1px] text-[#252B42]">
                    Bestseller Products
                </h2>

                <p className="mt-[10px] max-w-[260px] text-sm leading-5 tracking-[0.2px] text-[#737373] md:max-w-none">
                    Problems trying to resolve the conflict between
                </p>
            </div>

            <div className="mt-20 flex w-full max-w-[1050px] flex-col items-center gap-y-[80px] md:flex-row md:flex-wrap md:justify-center md:gap-x-[30px]">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

export default BestsellerProducts;
