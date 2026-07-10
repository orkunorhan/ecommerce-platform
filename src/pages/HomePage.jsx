import HeroSlider from "../components/home/HeroSlider";
import EditorsPick from "../components/home/EditorsPick";
import BestsellerProducts from "../components/common/BestsellerProducts";
import ProductPromoSlider from "../components/home/ProductPromoSlider";
import ProductPromoSection from "../components/home/ProductPromoSection";
import FeaturedPosts from "../components/home/FeaturedPosts";

function HomePage() {
    return (
        <>
            <HeroSlider />
            <EditorsPick />
            <BestsellerProducts
                eyebrow="Featured Products"
                title="Bestseller Products"
                description="Problems trying to resolve the conflict between"
            />
            <ProductPromoSlider />
            <ProductPromoSection />
            <FeaturedPosts />
        </>
    );
}

export default HomePage;
