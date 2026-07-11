import teamMembers from "../../data/teamMembers";
import TeamMemberCard from "./TeamMemberCard";

function TeamMembers() {
    return (
        <section className="flex w-full justify-center bg-[#FAFAFA] px-6 py-20 lg:py-28">
            <div className="flex w-full max-w-[1050px] flex-col items-center">
                <div className="flex flex-col items-center text-center">
                    <h2 className="max-w-[320px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] lg:max-w-none">
                        Meet Our Team
                    </h2>

                    <p className="mt-[10px] max-w-[470px] text-sm leading-5 tracking-[0.2px] text-[#737373]">
                        Problems trying to resolve the conflict between
                        the two major realms of Classical physics:
                        Newtonian mechanics
                    </p>
                </div>

                <div className="mt-16 flex w-full flex-col items-center gap-10 lg:mt-20 lg:flex-row lg:items-stretch lg:justify-center lg:gap-[30px]">
                    {teamMembers.map((member) => (
                        <TeamMemberCard
                            key={member.id}
                            member={member}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TeamMembers;
