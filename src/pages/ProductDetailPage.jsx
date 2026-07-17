import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    useHistory,
    useParams,
} from "react-router-dom";
import { LoaderCircle } from "lucide-react";

import ProductHero from "../components/product/ProductHero";
import ProductTabs from "../components/product/ProductTabs";
import BestsellerProducts from "../components/common/BestsellerProducts";
import BrandLogos from "../components/common/BrandLogos";

import { fetchProductById } from "../store/actions/productActions";
import { FETCH_STATES } from "../store/reducers/productReducer";

function ProductDetailPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();

    const product = useSelector(
        (state) => state.product.product,
    );

    const productFetchState = useSelector(
        (state) => state.product.productFetchState,
    );

    const productList = useSelector(
        (state) => state.product.productList,
    );

    useEffect(() => {
        dispatch(fetchProductById(productId)).catch(() => {
            // Failed state is handled through Redux.
        });
    }, [dispatch, productId]);

    const handleBack = () => {
        history.goBack();
    };

    if (
        productFetchState === FETCH_STATES.NOT_FETCHED ||
        productFetchState === FETCH_STATES.FETCHING
    ) {
        return (
            <main className="flex min-h-[500px] items-center justify-center bg-white">
                <LoaderCircle
                    aria-hidden="true"
                    className="h-10 w-10 animate-spin text-[#23A6F0]"
                />
            </main>
        );
    }

    if (productFetchState === FETCH_STATES.FAILED) {
        return (
            <main
                role="alert"
                className="mx-auto flex min-h-[500px] max-w-[1200px] flex-col items-center justify-center gap-6 px-6 text-center"
            >
                <h1 className="text-2xl font-bold text-[#252B42]">
                    Product could not be loaded.
                </h1>

                <p className="max-w-[500px] text-sm leading-6 text-[#737373]">
                    The requested product may not exist or an error may
                    have occurred while loading the product details.
                </p>

                <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-md bg-[#23A6F0] px-6 py-3 text-sm font-bold text-white transition-opacity duration-200 hover:opacity-80"
                >
                    Go Back
                </button>
            </main>
        );
    }

    if (!product?.id) {
        return (
            <main className="mx-auto flex min-h-[500px] max-w-[1200px] flex-col items-center justify-center gap-6 px-6 text-center">
                <h1 className="text-2xl font-bold text-[#252B42]">
                    Product not found.
                </h1>

                <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-md bg-[#23A6F0] px-6 py-3 text-sm font-bold text-white transition-opacity duration-200 hover:opacity-80"
                >
                    Go Back
                </button>
            </main>
        );
    }

    return (
        <main>
            <div className="mx-auto flex w-full max-w-[1200px] px-6 pt-6">
                <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm font-bold text-[#737373] transition-colors duration-200 hover:text-[#23A6F0]"
                >
                    <span aria-hidden="true">←</span>
                    Back
                </button>
            </div>

            <ProductHero product={product} />

            <ProductTabs product={product} />

            {productList.length > 0 && (
                <BestsellerProducts
                    title="Bestseller Products"
                    eyebrow=""
                    description=""
                    productsData={productList}
                    showColors={false}
                    backgroundClassName="bg-[#FAFAFA]"
                />
            )}

            <BrandLogos />
        </main>
    );
}

export default ProductDetailPage;
