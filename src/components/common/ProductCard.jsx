function ProductCard({ product }) {
    return (
        <article className="flex w-[240px] flex-col items-center bg-white">
            <img
                src={product.image}
                alt={product.name}
                className="h-[427px] w-[240px] object-cover"
            />

            <div className="flex h-[188px] w-full flex-col items-center px-[25px] pb-[35px] pt-[25px] text-center">
                <h3 className="text-base font-bold leading-6 tracking-[0.1px] text-[#252B42]">
                    {product.name}
                </h3>

                <p className="mt-[10px] text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                    {product.category}
                </p>

                <div className="mt-[10px] flex items-center gap-[5px]">
                    <span className="text-base font-bold leading-6 tracking-[0.1px] text-[#BDBDBD]">
                        ${product.price}
                    </span>
                    <span className="text-base font-bold leading-6 tracking-[0.1px] text-[#23856D]">
                        ${product.discountedPrice}
                    </span>
                </div>

                <div className="mt-[10px] flex items-center gap-[6px]">
                    {product.colors.map((color) => (
                        <span
                            key={color}
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
        </article>
    );
}

export default ProductCard;
