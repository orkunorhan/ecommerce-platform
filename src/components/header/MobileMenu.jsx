import {
    ChevronDown,
    Heart,
    LogOut,
    Package,
    Search,
    User,
} from "lucide-react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import GravatarAvatar from "../common/GravatarAvatar";
import { getCategoryPath } from "../../utils/categoryUtils";
import { setOffset } from "../../store/actions/productActions";
import { logoutUser } from "../../store/actions/clientActions";
import CartDropdown from "./CartDropdown";

function MobileMenu({ isOpen, onNavigate }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const user = useSelector((state) => state.client.user);
    const categories = useSelector(
        (state) => state.product.categories,
    );

    const isLoggedIn = Boolean(user?.email);

    const womenCategories = categories.filter(
        (category) => category.gender === "k",
    );

    const menCategories = categories.filter(
        (category) => category.gender === "e",
    );

    const handleNavigate = () => {
        setIsShopOpen(false);
        setIsUserMenuOpen(false);
        onNavigate?.();
    };

    const handleCategoryNavigate = () => {
        dispatch(setOffset(0));
        handleNavigate();
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        handleNavigate();
        history.push("/");
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="flex flex-col items-center px-8 pb-16 pt-8 lg:hidden">
            <nav className="flex w-full max-w-[320px] flex-col items-center gap-8">
                <Link
                    to="/"
                    onClick={handleNavigate}
                    className="text-[30px] font-normal leading-[45px] text-[#252B42]"
                >
                    Home
                </Link>

                <div className="flex w-full flex-col items-center">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/shop"
                            onClick={handleNavigate}
                            className="text-[30px] font-normal leading-[45px] text-[#737373]"
                        >
                            Shop
                        </Link>

                        <button
                            type="button"
                            onClick={() =>
                                setIsShopOpen(
                                    (currentValue) =>
                                        !currentValue,
                                )
                            }
                            aria-label={
                                isShopOpen
                                    ? "Close shop categories"
                                    : "Open shop categories"
                            }
                            aria-expanded={isShopOpen}
                            className="flex items-center justify-center text-[#737373]"
                        >
                            <ChevronDown
                                size={22}
                                strokeWidth={2}
                                className={`transition-transform duration-200 ${isShopOpen
                                    ? "rotate-180"
                                    : ""
                                    }`}
                            />
                        </button>
                    </div>

                    {isShopOpen && (
                        <div className="mt-6 grid w-full grid-cols-2 gap-8 border-t border-[#E6E6E6] pt-6">
                            <CategoryColumn
                                title="Kadın"
                                categories={womenCategories}
                                onNavigate={
                                    handleCategoryNavigate
                                }
                            />

                            <CategoryColumn
                                title="Erkek"
                                categories={menCategories}
                                onNavigate={
                                    handleCategoryNavigate
                                }
                            />
                        </div>
                    )}
                </div>

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
                    className="text-[30px] font-normal leading-[45px] text-[#737373]"
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

            <div className="mt-12 flex w-full max-w-[360px] flex-col items-center gap-7 text-[#23A6F0]">
                {isLoggedIn ? (
                    <div className="flex w-full flex-col items-center">
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
                            className="flex items-center gap-3 text-[20px] font-bold leading-[30px] transition-colors hover:text-[#1B8ED1]"
                        >
                            <GravatarAvatar
                                email={user.email}
                                name={user.name}
                                size={36}
                            />

                            <span>{user.name}</span>

                            <ChevronDown
                                size={20}
                                strokeWidth={2}
                                className={`transition-transform duration-200 ${isUserMenuOpen
                                    ? "rotate-180"
                                    : ""
                                    }`}
                            />
                        </button>

                        {isUserMenuOpen && (
                            <div
                                role="menu"
                                className="mt-5 flex w-full max-w-[120px] flex-col overflow-hidden rounded-md border border-[#E6E6E6] bg-white py-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                            >
                                <Link
                                    to="/orders"
                                    role="menuitem"
                                    onClick={handleNavigate}
                                    className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-[#737373] transition-colors hover:bg-[#F9F9F9] hover:text-[#23A6F0]"
                                >
                                    <Package size={18} />
                                    Orders
                                </Link>

                                <div className="border-t border-[#E6E6E6]" />

                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm font-semibold text-[#E74040] transition-colors hover:bg-[#FFF5F5]"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-[20px] font-bold leading-[30px]">
                        <Link
                            to="/login"
                            onClick={handleNavigate}
                            className="flex items-center gap-2 transition-colors hover:text-[#1B8ED1]"
                        >
                            <User
                                size={24}
                                strokeWidth={2}
                            />

                            Login
                        </Link>

                        <span>/</span>

                        <Link
                            to="/signup"
                            onClick={handleNavigate}
                            className="transition-colors hover:text-[#1B8ED1]"
                        >
                            Register
                        </Link>
                    </div>
                )}

                <div className="relative grid w-full grid-cols-3 items-center text-[#23A6F0]">
                    <button
                        type="button"
                        aria-label="Search"
                        className="col-start-1 row-start-1 flex justify-center"
                    >
                        <Search
                            size={26}
                            strokeWidth={1.8}
                        />
                    </button>

                    <CartDropdown
                        mobile
                        onNavigate={handleNavigate}
                    />

                    <button
                        type="button"
                        aria-label="Wishlist"
                        className="col-start-3 row-start-1 flex items-center justify-center gap-1"
                    >
                        <Heart
                            size={26}
                            strokeWidth={1.8}
                        />

                        <span className="text-xs leading-4">
                            1
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function CategoryColumn({
    title,
    categories,
    onNavigate,
}) {
    return (
        <div className="flex flex-col items-center">
            <h3 className="mb-4 text-base font-bold leading-6 text-[#252B42]">
                {title}
            </h3>

            <div className="flex flex-col items-center gap-3">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        to={getCategoryPath(category)}
                        onClick={onNavigate}
                        className="text-sm font-semibold leading-5 text-[#737373] transition-colors hover:text-[#23A6F0]"
                    >
                        {category.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MobileMenu;
