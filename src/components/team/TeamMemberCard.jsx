import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";

function TeamMemberCard({ member }) {
    const socialLinks = [
        {
            id: "facebook",
            label: "Facebook",
            href: member.socialLinks?.facebook,
            icon: FaFacebook,
            className: "text-[#335BF5]",
        },
        {
            id: "instagram",
            label: "Instagram",
            href: member.socialLinks?.instagram,
            icon: FaInstagram,
            className: "text-[#E51F5A]",
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            href: member.socialLinks?.linkedin,
            icon: FaLinkedin,
            className: "text-[#23A6F0]",
        },
    ];

    return (
        <article className="flex w-full max-w-[329px] flex-col bg-white">
            <img
                src={member.image}
                alt={`${member.name} - ${member.profession}`}
                className="h-[231px] w-full object-cover"
            />

            <div className="flex min-h-[175px] flex-col items-center px-6 py-[30px] text-center">
                <h3 className="text-base font-bold leading-6 tracking-[0.1px] text-[#252B42]">
                    {member.name}
                </h3>

                <p className="mt-[10px] text-sm font-bold leading-6 tracking-[0.2px] text-[#737373]">
                    {member.profession}
                </p>

                <div className="mt-[10px] flex items-center gap-5">
                    {socialLinks.map((social) => {
                        const Icon = social.icon;
                        const isExternalLink =
                            social.href &&
                            social.href !== "#";

                        return (
                            <a
                                key={social.id}
                                href={social.href || "#"}
                                aria-label={`${member.name} ${social.label}`}
                                target={
                                    isExternalLink
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    isExternalLink
                                        ? "noreferrer"
                                        : undefined
                                }
                                className={`flex items-center justify-center ${social.className}`}
                            >
                                <Icon size={24} />
                            </a>
                        );
                    })}
                </div>
            </div>
        </article>
    );
}

export default TeamMemberCard;
