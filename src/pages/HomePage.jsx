import HeroSlider from "../components/home/HeroSlider";
import EditorsPick from "../components/home/EditorsPick";
import BestsellerProducts from "../components/home/BestsellerProducts";
import ProductPromoSlider from "../components/home/ProductPromoSlider";

function HomePage() {
    return (
        <>
            <HeroSlider />
            <EditorsPick />
            <BestsellerProducts />
            <ProductPromoSlider />
        </>
    );
}

export default HomePage;
