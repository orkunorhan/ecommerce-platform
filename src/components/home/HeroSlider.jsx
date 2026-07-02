import { useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    const autoplay = useMemo(
        () =>
            Autoplay({
                delay: 5000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        []
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
        },
        [autoplay]
    );

    const scrollPrev = () => {
        emblaApi?.scrollPrev();
        autoplay.reset();
    };

    const scrollNext = () => {
        emblaApi?.scrollNext();
        autoplay.reset();
    };

    return (
        <section className="relative overflow-hidden bg-[#00B9D8]">
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                    {heroSlides.map((slide) => (
                        <HeroSlide key={slide.id} slide={slide} />
                    ))}
                </div>
            </div>

            <button
                type="button"
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 z-20 flex -translate-y-1/2 text-white transition-opacity hover:opacity-80 lg:left-8"
            >
                <ChevronLeft size={48} strokeWidth={1.5} />
            </button>

            <button
                type="button"
                onClick={scrollNext}
                className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 text-white transition-opacity hover:opacity-80 lg:right-8"
            >
                <ChevronRight size={48} strokeWidth={1.5} />
            </button>

            <div className="absolute bottom-[45px] left-1/2 z-20 hidden -translate-x-1/2 lg:flex">
                <span className="h-[10px] w-[63px] bg-white"></span>
                <span className="h-[10px] w-[63px] bg-white/50"></span>
            </div>
        </section>
    );
}

export default HeroSlider;
