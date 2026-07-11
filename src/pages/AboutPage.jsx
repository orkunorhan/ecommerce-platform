import AboutHero from "../components/about/AboutHero";
import AboutProblemSection from "../components/about/AboutProblemSection";
import AboutStatistics from "../components/about/AboutStatistics";
import aboutHero from "../data/aboutHero";
import aboutProblem from "../data/aboutProblem";
import aboutStatistics from "../data/aboutStatistics";

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
        </>
    );
}

export default AboutPage;
