import ProductCard from "../ProductCard";
import products from "../../data/products";

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
