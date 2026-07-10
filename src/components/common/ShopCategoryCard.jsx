function ShopCategoryCard({ category }) {
    return (
        <article className="group relative h-[300px] w-full overflow-hidden lg:h-[223px]">
            <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h3 className="text-2xl font-bold leading-8 tracking-[0.1px]">
                    {category.title}
                </h3>

                <p className="mt-4 text-base font-bold leading-6 tracking-[0.2px]">
                    {category.items} Items
                </p>
            </div>
        </article>
    );
}

export default ShopCategoryCard;
