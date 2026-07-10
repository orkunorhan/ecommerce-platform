import ProductHero from "../components/product/ProductHero";
import ProductTabs from "../components/product/ProductTabs";
import productDetail from "../data/productDetail";

function ProductDetailPage() {
    return (
        <>
            <ProductHero product={productDetail} />
            <ProductTabs product={productDetail} />
        </>
    );
}

export default ProductDetailPage;
