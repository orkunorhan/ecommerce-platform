const editorItems = [
    {
        id: 1,
        title: "Men",
        image: "/images/editors-pick-men.jpg",
    },
    {
        id: 2,
        title: "Women",
        image: "/images/editors-pick-women.jpg",
    },
    {
        id: 3,
        title: "Accessories",
        image: "/images/editors-pick-accessories.jpg",
    },
    {
        id: 4,
        title: "Kids",
        image: "/images/editors-pick-kids.jpg",
    },
];

function EditorsPick() {
    return (
        <section className="flex flex-col items-center bg-[#FAFAFA] px-6 py-16 lg:py-20">
            <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold uppercase leading-8 tracking-[0.1px] text-[#252B42]">
                    Editor’s Pick
                </h2>

                <p className="mt-2 max-w-[220px] text-sm leading-5 tracking-[0.2px] text-[#737373] lg:max-w-none">
                    Problems trying to resolve the conflict between
                </p>
            </div>

            <div className="mt-10 flex w-full max-w-[1050px] flex-col gap-[30px] lg:h-[500px] lg:flex-row">
                <EditorPickCard
                    item={editorItems[0]}
                    className="h-[500px] lg:h-full lg:w-[510px]"
                    buttonClassName="left-[31px] bottom-[26px] w-[170px]"
                />

                <EditorPickCard
                    item={editorItems[1]}
                    className="h-[500px] lg:h-full lg:w-[240px]"
                    buttonClassName="left-[21px] bottom-[26px] w-[136px]"
                />

                <div className="flex flex-col gap-4 lg:h-full lg:w-[240px] lg:gap-4">
                    <EditorPickCard
                        item={editorItems[2]}
                        className="h-[242px] lg:h-[242px]"
                        buttonClassName="left-[18px] bottom-[24px] w-[170px]"
                    />

                    <EditorPickCard
                        item={editorItems[3]}
                        className="h-[242px] lg:h-[242px]"
                        buttonClassName="left-[18px] bottom-[24px] w-[120px]"
                    />
                </div>
            </div>
        </section>
    );
}

function EditorPickCard({ item, className, buttonClassName }) {
    return (
        <div className={`relative flex overflow-hidden bg-white ${className}`}>
            <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
            />

            <div
                className={`absolute flex h-12 items-center justify-center bg-white ${buttonClassName}`}
            >
                <span className="text-sm font-bold uppercase leading-6 tracking-[0.2px] text-[#252B42]">
                    {item.title}
                </span>
            </div>
        </div>
    );
}

export default EditorsPick;
