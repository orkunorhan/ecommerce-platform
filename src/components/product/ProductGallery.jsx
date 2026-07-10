import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

function ProductGallery({ images, productName }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const showPreviousImage = () => {
        setActiveImageIndex((currentIndex) =>
            currentIndex === 0 ? images.length - 1 : currentIndex - 1
        );
    };

    const showNextImage = () => {
        setActiveImageIndex((currentIndex) =>
            currentIndex === images.length - 1 ? 0 : currentIndex + 1
        );
    };

    return (
        <div className="flex w-full flex-col">
            <div className="relative flex h-[450px] w-full overflow-hidden md:h-[550px] lg:w-[506px]">
                <img
                    src={images[activeImageIndex].url}
                    alt={images[activeImageIndex].alt || productName}
                    className="h-full w-full object-cover"
                />

                <button
                    type="button"
                    aria-label="Previous product image"
                    onClick={showPreviousImage}
                    className="absolute left-4 top-1/2 flex -translate-y-1/2 text-white"
                >
                    <ChevronLeft size={56} strokeWidth={1.5} />
                </button>

                <button
                    type="button"
                    aria-label="Next product image"
                    onClick={showNextImage}
                    className="absolute right-4 top-1/2 flex -translate-y-1/2 text-white"
                >
                    <ChevronRight size={56} strokeWidth={1.5} />
                </button>
            </div>

            <div className="mt-5 flex gap-5">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        type="button"
                        aria-label={`Show product image ${index + 1}`}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex h-[75px] w-[100px] overflow-hidden ${activeImageIndex === index
                                ? "opacity-100"
                                : "opacity-60"
                            }`}
                    >
                        <img
                            src={image.url}
                            alt={image.alt || productName}
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProductGallery;
