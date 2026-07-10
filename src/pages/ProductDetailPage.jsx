import ProductHero from "../components/product/ProductHero";
import ProductTabs from "../components/product/ProductTabs";
import productDetail from "../data/productDetail";
import BestsellerProducts from "../components/common/BestsellerProducts";
import BrandLogos from "../components/common/BrandLogos";
import products from "../data/products";

function ProductDetailPage() {
    return (
        <>
            <ProductHero product={productDetail} />
            <ProductTabs product={productDetail} />
            <BestsellerProducts
                title="Bestseller Products"
                eyebrow=""
                description=""
                productsData={products}
                showColors={false}
                backgroundClassName="bg-[#FAFAFA]"
            />
            <BrandLogos />
        </>
    );
}

export default ProductDetailPage;
