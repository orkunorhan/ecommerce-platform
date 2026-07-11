import AboutHero from "../components/about/AboutHero";
import AboutProblemSection from "../components/about/AboutProblemSection";
import AboutStatistics from "../components/about/AboutStatistics";
import AboutVideoSection from "../components/about/AboutVideoSection";
import TeamMembers from "../components/team/TeamMembers";
import BrandLogos from "../components/common/BrandLogos";
import aboutHero from "../data/aboutHero";
import aboutProblem from "../data/aboutProblem";
import aboutStatistics from "../data/aboutStatistics";
import aboutVideo from "../data/aboutVideo";

function AboutPage() {
    return (
        <>
            <AboutHero
                eyebrow={aboutHero.eyebrow}
                title={aboutHero.title}
                description={aboutHero.description}
                mobileDescriptionLines={aboutHero.mobileDescriptionLines}
                buttonText={aboutHero.buttonText}
                image={aboutHero.image}
            />
            <AboutProblemSection
                eyebrow={aboutProblem.eyebrow}
                title={aboutProblem.title}
                description={aboutProblem.description}
            />
            <AboutStatistics statistics={aboutStatistics} />
            <AboutVideoSection
                video={aboutVideo.video}
                poster={aboutVideo.poster}
                title={aboutVideo.title}
            />
            <TeamMembers />
            <BrandLogos
                showHeader
                background="gray"
                title="Big Companies Are Here"
                description="Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics"
            />
        </>
    );
}

export default AboutPage;
