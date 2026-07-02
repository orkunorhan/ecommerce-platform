import Slider from "../common/Slider";
import heroSlides from "../../data/heroSlides";
import HeroSlide from "./HeroSlide";

function HeroSlider() {
    return (
        <Slider className="bg-[#00B9D8]">
            {heroSlides.map((slide) => (
                <HeroSlide key={slide.id} slide={slide} />
            ))}
        </Slider>
    );
}

export default HeroSlider;
