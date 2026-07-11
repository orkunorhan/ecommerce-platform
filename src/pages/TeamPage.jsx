import TeamGallery from "../components/team/TeamGallery";
import TeamHero from "../components/team/TeamHero";
import teamGallery from "../data/teamGallery";
import teamHero from "../data/teamHero";

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
        </>
    );
}

export default TeamPage;
