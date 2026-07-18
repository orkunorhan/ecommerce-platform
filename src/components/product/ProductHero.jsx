import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {
    Link,
    useHistory,
} from "react-router-dom";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

function ProductHero({ product }) {
    const history = useHistory();

    return (
        <section className="flex w-full flex-col bg-[#FAFAFA]">
            <div className="mx-auto w-full max-w-[1050px] px-8 pb-6 pt-8">
                <div className="flex items-center justify-between gap-4">
                    <nav
                        aria-label="Breadcrumb"
                        className="flex min-w-0 items-center gap-[15px]"
                    >
                        <Link
                            to="/"
                            className="shrink-0 text-sm font-bold leading-6 tracking-[0.2px] text-[#252B42] transition-colors hover:text-[#23A6F0]"
                        >
                            Home
                        </Link>

                        <ChevronRight
                            size={16}
                            strokeWidth={2.5}
                            aria-hidden="true"
                            className="shrink-0 text-[#BDBDBD]"
                        />

                        <Link
                            to="/shop"
                            className="shrink-0 text-sm font-bold leading-6 tracking-[0.2px] text-[#737373] transition-colors hover:text-[#23A6F0]"
                        >
                            Shop
                        </Link>

                        <ChevronRight
                            size={16}
                            strokeWidth={2.5}
                            aria-hidden="true"
                            className="hidden shrink-0 text-[#BDBDBD] sm:block"
                        />

                        <span className="hidden truncate text-sm font-bold leading-6 tracking-[0.2px] text-[#737373] sm:block">
                            {product.name}
                        </span>
                    </nav>

                    <button
                        type="button"
                        onClick={() => history.goBack()}
                        className="flex shrink-0 items-center gap-2 text-sm font-bold text-[#23A6F0] transition-opacity hover:opacity-80"
                    >
                        <ChevronLeft
                            size={16}
                            strokeWidth={2.5}
                            aria-hidden="true"
                        />

                        <span>Back</span>
                    </button>
                </div>
            </div>

            <div className="mx-auto flex w-full max-w-[1050px] flex-col gap-12 px-8 pb-12 lg:flex-row lg:gap-14">
                <ProductGallery
                    images={product.images ?? []}
                    productName={
                        product.name ?? "Product"
                    }
                />

                <ProductInfo product={product} />
            </div>
        </section>
    );
}

export default ProductHero;
