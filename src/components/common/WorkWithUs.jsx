import { Link } from "react-router-dom";

function WorkWithUs({
    eyebrow,
    title,
    description,
    buttonText,
    buttonLink,
    image,
}) {
    return (
        <section className="w-full bg-[#2A7CC7]">
            <div className="mx-auto flex w-full max-w-[1440px]">
                <div className="flex min-h-[680px] w-full items-center justify-center px-8 py-20 text-center lg:min-h-[636px] lg:w-[64%] lg:justify-start lg:px-[120px] lg:py-16 lg:text-left">
                    <div className="flex w-full max-w-[560px] flex-col items-center lg:items-start">
                        <p className="text-base font-bold uppercase leading-6 tracking-[0.1px] text-white">
                            {eyebrow}
                        </p>

                        <h2 className="mt-10 max-w-[480px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-white lg:mt-8 lg:text-[40px] lg:leading-[50px]">
                            {title}
                        </h2>

                        <p className="mt-10 max-w-[500px] text-xl leading-[30px] tracking-[0.2px] text-white lg:mt-8">
                            {description}
                        </p>

                        <Link
                            to={buttonLink}
                            onClick={() => window.scrollTo(0, 0)}
                            className="mt-12 inline-flex min-w-[170px] items-center justify-center rounded-[5px] border border-white bg-transparent px-10 py-[15px] text-sm font-bold leading-[22px] tracking-[0.2px] text-white transition-colors hover:bg-white hover:text-[#2A7CC7] lg:mt-8"
                        >
                            {buttonText}
                        </Link>
                    </div>
                </div>

                <div className="hidden min-h-[636px] w-[36%] lg:block">
                    <img
                        src={image}
                        alt="Fashion model"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            </div>
        </section>
    );
}

export default WorkWithUs;
