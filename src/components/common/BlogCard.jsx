import { ChartNoAxesColumn, ChevronRight, Clock3 } from "lucide-react";

function BlogCard({ post }) {
    return (
        <article className="flex w-full max-w-[348px] flex-col bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)]">
            <div className="relative flex h-[300px] w-full overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                />

                <span className="absolute left-5 top-5 rounded-[3px] bg-[#E74040] px-[10px] py-[2px] text-sm font-bold uppercase leading-6 tracking-[0.2px] text-white">
                    {post.badge}
                </span>
            </div>

            <div className="flex flex-col px-[25px] py-[25px]">
                <div className="flex items-center gap-[15px]">
                    {post.tags.map((tag, index) => (
                        <span
                            key={tag}
                            className={`text-xs leading-4 tracking-[0.2px] ${index === 0 ? "text-[#8EC2F2]" : "text-[#737373]"
                                }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="mt-[10px] text-xl leading-[30px] tracking-[0.2px] text-[#252B42]">
                    {post.title}
                </h3>

                <p className="mt-[10px] text-sm font-medium leading-5 tracking-[0.2px] text-[#737373]">
                    {post.description}
                </p>

                <div className="mt-[25px] flex items-center justify-between">
                    <div className="flex items-center gap-[5px]">
                        <Clock3 size={16} className="text-[#23A6F0]" />
                        <span className="text-xs leading-4 tracking-[0.2px] text-[#737373]">
                            {post.date}
                        </span>
                    </div>

                    <div className="flex items-center gap-[5px]">
                        <ChartNoAxesColumn size={16} className="text-[#23856D]" />
                        <span className="text-xs leading-4 tracking-[0.2px] text-[#737373]">
                            {post.comments} comments
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    className="mt-[25px] flex items-center gap-[10px] text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]"
                >
                    Learn More
                    <ChevronRight size={20} className="text-[#23A6F0]" />
                </button>
            </div>
        </article>
    );
}

export default BlogCard;
