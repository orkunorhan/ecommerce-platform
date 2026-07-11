import { Play } from "lucide-react";
import { useRef, useState } from "react";

function AboutVideoSection({ video, poster, title }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = async () => {
        if (!videoRef.current) {
            return;
        }

        try {
            await videoRef.current.play();
            setIsPlaying(true);
        } catch {
            setIsPlaying(false);
        }
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    return (
        <section className="w-full bg-white px-6 py-20 lg:py-28">
            <div className="mx-auto w-full max-w-[1050px]">
                <div className="relative overflow-hidden rounded-[20px]">
                    <video
                        ref={videoRef}
                        controls={isPlaying}
                        preload="metadata"
                        poster={poster}
                        onPause={handlePause}
                        onEnded={handleEnded}
                        className="block aspect-square w-full object-cover md:aspect-video"
                    >
                        <source src={video} type="video/mp4" />

                        Your browser does not support the video tag.
                    </video>

                    {!isPlaying && (
                        <button
                            type="button"
                            aria-label={`Play ${title}`}
                            onClick={handlePlay}
                            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#23A6F0] text-white transition-transform hover:scale-105 lg:h-[92px] lg:w-[92px]"
                        >
                            <Play
                                size={32}
                                fill="currentColor"
                                className="ml-1"
                            />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}

export default AboutVideoSection;
