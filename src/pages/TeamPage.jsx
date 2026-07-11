import TeamHero from "../components/team/TeamHero";
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
        </>
    );
}

export default TeamPage;
