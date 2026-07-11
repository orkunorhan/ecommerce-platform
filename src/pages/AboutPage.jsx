import AboutHero from "../components/about/AboutHero";
import AboutProblemSection from "../components/about/AboutProblemSection";
import aboutHero from "../data/aboutHero";
import aboutProblem from "../data/aboutProblem";

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
        </>
    );
}

export default AboutPage;
