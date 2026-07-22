import { useEffect, useRef, useState } from "react";
import {
    ChevronDown,
    Heart,
    LogOut,
    Menu,
    Package,
    Search,
    User,
} from "lucide-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MobileMenu from "./MobileMenu";
import GravatarAvatar from "../common/GravatarAvatar";
import ShopDropdown from "../navigation/ShopDropdown";
import CartDropdown from "./CartDropdown";
import { logoutUser } from "../../store/actions/clientActions";

function Navbar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const userMenuRef = useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const user = useSelector((state) => state.client.user);
    const isLoggedIn = Boolean(user?.email);

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
    };

    const closeUserMenu = () => {
        setIsUserMenuOpen(false);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        closeUserMenu();
        closeMobileMenu();
        history.push("/");
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target)
            ) {
                closeUserMenu();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                closeUserMenu();
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick,
        );

        document.addEventListener(
            "keydown",
            handleEscapeKey,
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick,
            );

            document.removeEventListener(
                "keydown",
                handleEscapeKey,
            );
        };
    }, []);

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
                        <div
                            ref={userMenuRef}
                            className="relative"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setIsUserMenuOpen(
                                        (previousState) =>
                                            !previousState,
                                    )
                                }
                                aria-haspopup="menu"
                                aria-expanded={isUserMenuOpen}
                                className="flex items-center gap-2 text-sm font-bold leading-6 transition-colors hover:text-[#1B8ED1]"
                            >
                                <GravatarAvatar
                                    email={user.email}
                                    name={user.name}
                                    size={28}
                                />

                                <span>{user.name}</span>

                                <ChevronDown
                                    size={16}
                                    strokeWidth={2.5}
                                    className={`transition-transform ${isUserMenuOpen
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                />
                            </button>

                            {isUserMenuOpen && (
                                <div
                                    role="menu"
                                    className="absolute right-0 top-[calc(100%+12px)] z-50 w-32 overflow-hidden rounded-md border border-[#E6E6E6] bg-white py-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                                >
                                    <Link
                                        to="/orders"
                                        role="menuitem"
                                        onClick={closeUserMenu}
                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold text-[#737373] transition-colors hover:bg-[#F9F9F9] hover:text-[#23A6F0]"
                                    >
                                        <Package size={17} />
                                        Orders
                                    </Link>

                                    <div className="my-1 border-t border-[#E6E6E6]" />

                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold text-[#E74040] transition-colors hover:bg-[#FFF5F5]"
                                    >
                                        <LogOut size={17} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-[10px] text-sm font-bold leading-6">
                            <Link
                                to="/login"
                                className="flex items-center gap-[5px] transition-colors hover:text-[#1B8ED1]"
                            >
                                <User
                                    size={16}
                                    strokeWidth={2.5}
                                />
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
                    aria-label={
                        isMenuOpen
                            ? "Close menu"
                            : "Open menu"
                    }
                    aria-expanded={isMenuOpen}
                    onClick={() =>
                        setIsMenuOpen(
                            (currentValue) =>
                                !currentValue,
                        )
                    }
                    className="flex items-center justify-center text-[#737373] lg:hidden"
                >
                    <Menu
                        size={26}
                        strokeWidth={1.8}
                    />
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
