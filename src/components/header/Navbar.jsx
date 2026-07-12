import { useState } from "react";
import {
    ChevronDown,
    Heart,
    Menu,
    Search,
    ShoppingCart,
    User,
} from "lucide-react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
    };

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

                        <Link
                            to="/shop"
                            className="flex items-center gap-1 text-sm font-bold leading-6 text-[#252B42]"
                        >
                            Shop
                            <ChevronDown size={14} strokeWidth={2.5} />
                        </Link>

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
                    <Link
                        to="/signup"
                        className="flex items-center gap-[5px] text-sm font-bold leading-6"
                    >
                        <User size={16} strokeWidth={2.5} />
                        Login / Register
                    </Link>

                    <button type="button" aria-label="Search">
                        <Search size={18} strokeWidth={2.5} />
                    </button>

                    <button
                        type="button"
                        aria-label="Shopping cart"
                        className="flex items-center gap-[5px]"
                    >
                        <ShoppingCart size={18} strokeWidth={2.5} />
                        <span className="text-xs leading-4">1</span>
                    </button>

                    <button
                        type="button"
                        aria-label="Wishlist"
                        className="flex items-center gap-[5px]"
                    >
                        <Heart size={18} strokeWidth={2.5} />
                        <span className="text-xs leading-4">1</span>
                    </button>
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
