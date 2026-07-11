import TeamGallery from "../components/team/TeamGallery";
import TeamHero from "../components/team/TeamHero";
import teamGallery from "../data/teamGallery";
import teamHero from "../data/teamHero";
import TeamMembers from "../components/team/TeamMembers";
import TrialSection from "../components/common/TrialSection";
import trialSection from "../data/trialSection";

function TeamPage() {
    return (
        <>
            <TeamHero
                eyebrow={teamHero.eyebrow}
                titleFirstLine={teamHero.titleFirstLine}
                titleSecondLine={teamHero.titleSecondLine}
                breadcrumb={teamHero.breadcrumb}
            />
            <TeamGallery images={teamGallery} />
            <TeamMembers />
            <TrialSection
                title={trialSection.title}
                description={trialSection.description}
                buttonText={trialSection.buttonText}
            />
        </>
    );
}

export default TeamPage;
