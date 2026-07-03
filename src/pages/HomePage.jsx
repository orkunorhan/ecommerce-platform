import HeroSlider from "../components/home/HeroSlider";
import EditorsPick from "../components/home/EditorsPick";
import BestsellerProducts from "../components/home/BestsellerProducts";
import ProductPromoSlider from "../components/home/ProductPromoSlider";
import ProductPromoSection from "../components/home/ProductPromoSection";
import FeaturedPosts from "../components/home/FeaturedPosts";

function HomePage() {
    return (
        <>
            <HeroSlider />
            <EditorsPick />
            <BestsellerProducts />
            <ProductPromoSlider />
            <ProductPromoSection />
            <FeaturedPosts />
        </>
    );
}

export default HomePage;
