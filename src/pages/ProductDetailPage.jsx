import ProductHero from "../components/product/ProductHero";
import productDetail from "../data/productDetail";

function ProductDetailPage() {
    return <ProductHero product={productDetail} />;
}

export default ProductDetailPage;
