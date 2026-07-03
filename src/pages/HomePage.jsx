import HeroSlider from "../components/home/HeroSlider";
import EditorsPick from "../components/home/EditorsPick";
import BestsellerProducts from "../components/home/BestsellerProducts";
import ProductPromoSlider from "../components/home/ProductPromoSlider";
import ProductPromoSection from "../components/home/ProductPromoSection";

function HomePage() {
    return (
        <>
            <HeroSlider />
            <EditorsPick />
            <BestsellerProducts />
            <ProductPromoSlider />
            <ProductPromoSection />
        </>
    );
}

export default HomePage;
