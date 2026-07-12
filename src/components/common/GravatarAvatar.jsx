import { useEffect, useState } from "react";
import { User } from "lucide-react";

async function createGravatarHash(email) {
    const normalizedEmail = email.trim().toLowerCase();
    const encodedEmail = new TextEncoder().encode(normalizedEmail);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        encodedEmail,
    );

    return Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

function GravatarAvatar({
    email,
    name,
    size = 32,
    className = "",
}) {
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadAvatar = async () => {
            if (!email) {
                setAvatarUrl("");
                return;
            }

            try {
                const hash = await createGravatarHash(email);

                if (isMounted) {
                    setAvatarUrl(
                        `https://www.gravatar.com/avatar/${hash}?s=${size}&d=404&r=g`,
                    );
                }
            } catch {
                if (isMounted) {
                    setAvatarUrl("");
                }
            }
        };

        loadAvatar();

        return () => {
            isMounted = false;
        };
    }, [email, size]);

    if (!avatarUrl) {
        return (
            <span
                className={`flex shrink-0 items-center justify-center rounded-full bg-[#E6F4FD] text-[#23A6F0] ${className}`}
                style={{
                    width: size,
                    height: size,
                }}
                aria-hidden="true"
            >
                <User
                    size={Math.max(size * 0.55, 16)}
                    strokeWidth={2}
                />
            </span>
        );
    }

    return (
        <img
            src={avatarUrl}
            alt={`${name || "User"} avatar`}
            width={size}
            height={size}
            onError={() => setAvatarUrl("")}
            className={`shrink-0 rounded-full object-cover ${className}`}
        />
    );
}

export default GravatarAvatar;
