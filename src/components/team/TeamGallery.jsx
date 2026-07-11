const galleryPositions = [
    // Featured image
    "col-span-2 aspect-[414/493] lg:col-span-1 lg:row-span-2 lg:aspect-auto",

    // Light outfit
    "col-start-1 row-start-2 aspect-[190/242] lg:col-start-2 lg:row-start-1 lg:aspect-auto",

    // Light denim
    "col-start-1 row-start-3 aspect-[190/242] lg:col-start-3 lg:row-start-1 lg:aspect-auto",

    // Black hoodie
    "col-start-2 row-start-2 aspect-[190/242] lg:col-start-2 lg:row-start-2 lg:aspect-auto",

    // Blue denim
    "col-start-2 row-start-3 aspect-[190/242] lg:col-start-3 lg:row-start-2 lg:aspect-auto",
];

function TeamGallery({ images }) {
    return (
        <section className="w-full bg-white">
            <div className="grid w-full grid-cols-2 gap-2 lg:h-[758px] lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-2 lg:gap-[10px]">
                {images.map((item, index) => (
                    <figure
                        key={item.id}
                        className={`m-0 overflow-hidden ${galleryPositions[index] ?? ""
                            }`}
                    >
                        <img
                            src={item.image}
                            alt={item.alt}
                            className="block h-full w-full object-cover"
                        />
                    </figure>
                ))}
            </div>
        </section>
    );
}

export default TeamGallery;
