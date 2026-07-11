import AboutHero from "../components/about/AboutHero";
import aboutHero from "../data/aboutHero";

function AboutPage() {
    return (
        <AboutHero
            eyebrow={aboutHero.eyebrow}
            title={aboutHero.title}
            description={aboutHero.description}
            mobileDescriptionLines={aboutHero.mobileDescriptionLines}
            buttonText={aboutHero.buttonText}
            image={aboutHero.image}
        />
    );
}

export default AboutPage;
