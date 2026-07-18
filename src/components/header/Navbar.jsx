import { useState } from "react";
import {
    Heart,
    Menu,
    Search,
    User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MobileMenu from "./MobileMenu";
import GravatarAvatar from "../common/GravatarAvatar";
import ShopDropdown from "../navigation/ShopDropdown";
import CartDropdown from "./CartDropdown";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
    };

    const user = useSelector((state) => state.client.user);
    const isLoggedIn = Boolean(user?.email);

    return (
        <div className="flex flex-col bg-white">
            <div className="flex h-[88px] items-center justify-between px-6 lg:h-[58px] lg:px-9">
                <div className="flex items-center lg:gap-28">
                    <Link
                        to="/"
                        className="text-2xl font-bold leading-8 text-[#252B42]"
                    >
                        Bandage
                    </Link>

                    <nav className="hidden items-center gap-[15px] lg:flex">
                        <Link
                            to="/"
                            className="text-sm font-bold leading-6 text-[#737373]"
                        >
                            Home
                        </Link>

                        <ShopDropdown />

                        <Link
                            to="/about"
                            className="text-sm font-bold leading-6 text-[#737373]"
                        >
                            About
                        </Link>

                        <Link
                            to="/blog"
                            className="text-sm font-bold leading-6 text-[#737373]"
                        >
                            Blog
                        </Link>

                        <Link
                            to="/contact"
                            className="text-sm font-bold leading-6 text-[#737373]"
                        >
                            Contact
                        </Link>

                        <Link
                            to="/team"
                            className="text-sm font-bold leading-6 text-[#737373]"
                        >
                            Team
                        </Link>

                        <Link
                            to="/pages"
                            className="text-sm font-bold leading-6 text-[#737373]"
                        >
                            Pages
                        </Link>
                    </nav>
                </div>

                <div className="hidden items-center gap-[30px] text-[#23A6F0] lg:flex">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-2 text-sm font-bold leading-6">
                            <GravatarAvatar
                                email={user.email}
                                name={user.name}
                                size={28}
                            />

                            <span>{user.name}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-[10px] text-sm font-bold leading-6">
                            <Link
                                to="/login"
                                className="flex items-center gap-[5px] transition-colors hover:text-[#1B8ED1]"
                            >
                                <User size={16} strokeWidth={2.5} />
                                Login
                            </Link>

                            <span>/</span>

                            <Link
                                to="/signup"
                                className="transition-colors hover:text-[#1B8ED1]"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    <div className="flex items-center gap-5 text-[#23A6F0]">
                        <button
                            type="button"
                            aria-label="Search"
                        >
                            <Search
                                size={18}
                                strokeWidth={2.5}
                            />
                        </button>

                        <CartDropdown />

                        <button
                            type="button"
                            aria-label="Wishlist"
                            className="flex items-center gap-[5px]"
                        >
                            <Heart
                                size={18}
                                strokeWidth={2.5}
                            />

                            <span className="text-xs leading-4">
                                1
                            </span>
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
                    className="flex items-center justify-center text-[#737373] lg:hidden"
                >
                    <Menu size={26} strokeWidth={1.8} />
                </button>
            </div>

            <MobileMenu
                isOpen={isMenuOpen}
                onNavigate={closeMobileMenu}
            />
        </div>
    );
}

export default Navbar;
