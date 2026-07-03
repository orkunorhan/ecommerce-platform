import { useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Slider({
    children,
    autoplay = true,
    delay = 5000,
    showArrows = true,
    showPagination = true,
    className = "",
    viewportClassName = "",
    containerClassName = "",
    paginationClassName = "",
}) {
    const autoplayPlugin = useMemo(() => {
        if (!autoplay) {
            return null;
        }

        return Autoplay({
            delay,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        });
    }, [autoplay, delay]);

    const plugins = autoplayPlugin ? [autoplayPlugin] : [];

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
        },
        plugins
    );

    const scrollPrev = () => {
        emblaApi?.scrollPrev();
        autoplayPlugin?.reset();
    };

    const scrollNext = () => {
        emblaApi?.scrollNext();
        autoplayPlugin?.reset();
    };

    return (
        <section className={`relative overflow-hidden ${className}`}>
            <div ref={emblaRef} className={`overflow-hidden ${viewportClassName}`}>
                <div className={`flex ${containerClassName}`}>{children}</div>
            </div>

            {showArrows && (
                <>
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
                </>
            )}

            {showPagination && (
                <div
                    className={`absolute bottom-[45px] left-1/2 z-20 hidden -translate-x-1/2 lg:flex ${paginationClassName}`}
                >
                    <span className="h-[10px] w-[63px] bg-white"></span>
                    <span className="h-[10px] w-[63px] bg-white/50"></span>
                </div>
            )}
        </section>
    );
}

export default Slider;
