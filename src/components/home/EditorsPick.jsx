import editorsPick from "../../data/editorsPick";

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
                <EditorPickCard item={editorsPick[0]} />
                <EditorPickCard item={editorsPick[1]} />

                <div className="flex flex-col gap-4 lg:h-full lg:w-[240px]">
                    <EditorPickCard item={editorsPick[2]} />
                    <EditorPickCard item={editorsPick[3]} />
                </div>
            </div>
        </section>
    );
}

function EditorPickCard({ item }) {
    return (
        <div
            className={`relative flex overflow-hidden bg-white ${item.cardClassName}`}
        >
            <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
            />

            <div
                className={`absolute flex h-12 items-center justify-center bg-white ${item.buttonClassName}`}
            >
                <span className="text-sm font-bold uppercase leading-6 tracking-[0.2px] text-[#252B42]">
                    {item.title}
                </span>
            </div>
        </div>
    );
}

export default EditorsPick;
