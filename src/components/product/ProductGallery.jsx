import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

function ProductGallery({
    images = [],
    productName = "Product",
}) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const hasImages = images.length > 0;
    const hasMultipleImages = images.length > 1;

    const safeActiveImageIndex =
        activeImageIndex < images.length
            ? activeImageIndex
            : 0;

    const activeImage = images[safeActiveImageIndex];

    const showPreviousImage = () => {
        if (!hasMultipleImages) {
            return;
        }

        setActiveImageIndex((currentIndex) => {
            const safeCurrentIndex =
                currentIndex < images.length
                    ? currentIndex
                    : 0;

            return safeCurrentIndex === 0
                ? images.length - 1
                : safeCurrentIndex - 1;
        });
    };

    const showNextImage = () => {
        if (!hasMultipleImages) {
            return;
        }

        setActiveImageIndex((currentIndex) => {
            const safeCurrentIndex =
                currentIndex < images.length
                    ? currentIndex
                    : 0;

            return safeCurrentIndex === images.length - 1
                ? 0
                : safeCurrentIndex + 1;
        });
    };

    if (!hasImages) {
        return (
            <div className="flex w-full flex-col">
                <div className="flex h-[450px] w-full items-center justify-center bg-[#ECECEC] text-sm font-semibold text-[#737373] md:h-[550px] lg:w-[506px]">
                    Product image is not available.
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col">
            <div className="relative flex h-[450px] w-full overflow-hidden md:h-[550px] lg:w-[506px]">
                <img
                    src={activeImage.url}
                    alt={activeImage.alt || productName}
                    className="h-full w-full object-cover"
                />

                {hasMultipleImages && (
                    <>
                        <button
                            type="button"
                            aria-label="Previous product image"
                            onClick={showPreviousImage}
                            className="absolute left-4 top-1/2 flex -translate-y-1/2 text-white"
                        >
                            <ChevronLeft
                                size={56}
                                strokeWidth={1.5}
                            />
                        </button>

                        <button
                            type="button"
                            aria-label="Next product image"
                            onClick={showNextImage}
                            className="absolute right-4 top-1/2 flex -translate-y-1/2 text-white"
                        >
                            <ChevronRight
                                size={56}
                                strokeWidth={1.5}
                            />
                        </button>
                    </>
                )}
            </div>

            {hasImages && (
                <div className="mt-5 flex gap-5 overflow-x-auto">
                    {images.map((image, index) => (
                        <button
                            key={`${image.url}-${image.index ?? index}`}
                            type="button"
                            aria-label={`Show product image ${index + 1}`}
                            onClick={() => setActiveImageIndex(index)}
                            className={`flex h-[75px] w-[100px] shrink-0 overflow-hidden transition-opacity ${safeActiveImageIndex === index
                                ? "opacity-100"
                                : "opacity-60"
                                }`}
                        >
                            <img
                                src={image.url}
                                alt={
                                    image.alt ||
                                    `${productName} ${index + 1}`
                                }
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductGallery;
