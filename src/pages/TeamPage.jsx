import TeamGallery from "../components/team/TeamGallery";
import TeamHero from "../components/team/TeamHero";
import teamGallery from "../data/teamGallery";
import teamHero from "../data/teamHero";
import TeamMembers from "../components/team/TeamMembers";

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
        </>
    );
}

export default TeamPage;
