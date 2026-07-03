import BlogCard from "../common/BlogCard";
import featuredPosts from "../../data/featuredPosts";

function FeaturedPosts() {
    return (
        <section className="flex flex-col items-center bg-white px-6 py-20 lg:px-0 lg:py-28">
            <div className="flex flex-col items-center text-center">
                <p className="text-sm font-bold leading-6 tracking-[0.2px] text-[#23A6F0]">
                    Practice Advice
                </p>

                <h2 className="mt-[10px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42]">
                    Featured Posts
                </h2>

                <p className="mt-[10px] max-w-[330px] text-sm leading-5 tracking-[0.2px] text-[#737373] lg:max-w-[470px]">
                    Problems trying to resolve the conflict between the two major
                    realms of Classical physics: Newtonian mechanics
                </p>
            </div>

            <div className="mt-20 flex w-full max-w-[1050px] flex-col items-center gap-[30px] lg:flex-row lg:justify-center">
                {featuredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}

export default FeaturedPosts;
