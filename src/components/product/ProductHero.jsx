import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

function ProductHero({ product }) {
    return (
        <section className="flex w-full flex-col bg-[#FAFAFA]">
            <div className="mx-auto flex w-full max-w-[1050px] px-8 py-8">
                <div className="flex items-center gap-[15px]">
                    <Link
                        to="/"
                        className="text-sm font-bold leading-6 tracking-[0.2px] text-[#252B42]"
                    >
                        Home
                    </Link>

                    <ChevronRight
                        size={16}
                        aria-hidden="true"
                        className="text-[#BDBDBD]"
                    />

                    <Link
                        to="/shop"
                        className="text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]"
                    >
                        Shop
                    </Link>
                </div>
            </div>

            <div className="mx-auto flex w-full max-w-[1050px] flex-col gap-12 px-8 pb-16 lg:flex-row lg:gap-14">
                <ProductGallery
                    images={product.images ?? []}
                    productName={product.name ?? "Product"}
                />

                <ProductInfo product={product} />
            </div>
        </section>
    );
}

export default ProductHero;
