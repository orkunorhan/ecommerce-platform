import Slider from "../common/Slider";
import promoSlides from "../../data/promoSlides";
import ProductPromoSlide from "./ProductPromoSlide";

function ProductPromoSlider() {
    return (
        <Slider
            className="bg-[#23856D]"
            showPagination={false}
        >
            {promoSlides.map((slide) => (
                <ProductPromoSlide key={slide.id} slide={slide} />
            ))}
        </Slider>
    );
}

export default ProductPromoSlider;
