import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

function MobileMenu({ isOpen, onNavigate }) {
    if (!isOpen) {
        return null;
    }

    const handleNavigate = () => {
        onNavigate?.();
    };

    return (
        <div className="flex flex-col items-center px-8 pb-16 pt-8 lg:hidden">
            <nav className="flex flex-col items-center gap-8">
                <Link
                    to="/"
                    onClick={handleNavigate}
                    className="text-[30px] font-normal leading-[45px] text-[#252B42]"
                >
                    Home
                </Link>

                <Link
                    to="/shop"
                    onClick={handleNavigate}
                    className="text-[30px] font-normal leading-[45px] text-[#737373]"
                >
                    Shop
                </Link>

                <Link
                    to="/about"
                    onClick={handleNavigate}
                    className="text-[30px] font-normal leading-[45px] text-[#737373]"
                >
                    About
                </Link>

                <Link
                    to="/blog"
                    onClick={handleNavigate}
                    className="text-[30px] font-normal leading-[45px] text-[#737373]"
                >
                    Blog
                </Link>

                <Link
                    to="/contact"
                    onClick={handleNavigate}
                    className="text-[30px] font-bold leading-[45px] text-[#737373]"
                >
                    Contact
                </Link>

                <Link
                    to="/team"
                    onClick={handleNavigate}
                    className="text-[30px] font-normal leading-[45px] text-[#737373]"
                >
                    Team
                </Link>

                <Link
                    to="/pages"
                    onClick={handleNavigate}
                    className="text-[30px] font-normal leading-[45px] text-[#737373]"
                >
                    Pages
                </Link>
            </nav>

            <div className="mt-12 flex flex-col items-center gap-7 text-[#23A6F0]">
                <div className="flex items-center gap-5 text-[20px] font-bold leading-[30px]">
                    <Link
                        to="/login"
                        onClick={handleNavigate}
                        className="flex items-center gap-2 transition-colors hover:text-[#23A6F0]"
                    >
                        <User size={24} strokeWidth={2} />
                        Login
                    </Link>

                    <span>/</span>

                    <Link
                        to="/signup"
                        onClick={handleNavigate}
                        className="transition-colors hover:text-[#23A6F0]"
                    >
                        Register
                    </Link>
                </div>

                <button
                    type="button"
                    aria-label="Search"
                    className="flex items-center justify-center"
                >
                    <Search size={26} strokeWidth={1.8} />
                </button>

                <button
                    type="button"
                    aria-label="Shopping cart"
                    className="flex items-center gap-1"
                >
                    <ShoppingCart size={26} strokeWidth={1.8} />
                    <span className="text-xs">1</span>
                </button>

                <button
                    type="button"
                    aria-label="Wishlist"
                    className="flex items-center gap-1"
                >
                    <Heart size={26} strokeWidth={1.8} />
                    <span className="text-xs">1</span>
                </button>
            </div>
        </div>
    );
}

export default MobileMenu;
