import Slider from "../common/Slider";
import HeroSlide from "./HeroSlide";

const heroSlides = [
    {
        id: 1,
        image: "/images/hero-cover.jpg",
        subtitle: "Summer 2020",
        title: "New Collection",
        description:
            "We know how large objects will act, but things on a small scale.",
        buttonText: "Shop Now",
    },
    {
        id: 2,
        image: "/images/hero-cover-2.jpg",
        subtitle: "Summer 2020",
        title: "New Collection",
        description:
            "We know how large objects will act, but things on a small scale.",
        buttonText: "Shop Now",
    },
];

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
