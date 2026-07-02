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
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    return (
        <div className="flex flex-col bg-white">
            <div className="flex h-14.5 items-center justify-between px-9 lg:px-9">
                <div className="flex items-center gap-28">
                    <Link to="/" className="text-2xl font-bold leading-8 text-[#252B42]">
                        Bandage
                    </Link>

                    <nav className="hidden items-center gap-3.75 lg:flex">
                        <Link to="/" className="text-sm font-bold leading-6 text-[#737373]">
                            Home
                        </Link>

                        <Link
                            to="/shop"
                            className="flex items-center gap-1 text-sm font-bold leading-6 text-[#252B42]"
                        >
                            Shop <ChevronDown size={14} strokeWidth={2.5} />
                        </Link>

                        <Link to="/about" className="text-sm font-bold leading-6 text-[#737373]">
                            About
                        </Link>

                        <Link to="/blog" className="text-sm font-bold leading-6 text-[#737373]">
                            Blog
                        </Link>

                        <Link to="/contact" className="text-sm font-bold leading-6 text-[#737373]">
                            Contact
                        </Link>

                        <Link to="/pages" className="text-sm font-bold leading-6 text-[#737373]">
                            Pages
                        </Link>
                    </nav>
                </div>

                <div className="hidden items-center gap-7.5 text-[#23A6F0] lg:flex">
                    <Link to="/login" className="flex items-center gap-1.25text-sm font-bold leading-6">
                        <User size={16} strokeWidth={2.5} />
                        Login / Register
                    </Link>

                    <Search size={18} strokeWidth={2.5} />

                    <div className="flex items-center gap-1.25">
                        <ShoppingCart size={18} strokeWidth={2.5} />
                        <span className="text-xs leading-4">1</span>
                    </div>

                    <div className="flex items-center gap-1.25">
                        <Heart size={18} strokeWidth={2.5} />
                        <span className="text-xs leading-4">1</span>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-[#252B42] lg:hidden">
                    <Search size={24} />
                    <ShoppingCart size={24} />
                    <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu size={26} />
                    </button>
                </div>
            </div>

            <MobileMenu isOpen={isMenuOpen} />
        </div>
    );
}

export default Navbar;
