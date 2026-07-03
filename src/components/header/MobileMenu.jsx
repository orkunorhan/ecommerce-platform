import { Link } from "react-router-dom";

function MobileMenu({ isOpen }) {
    if (!isOpen) {
        return null;
    }

    return (
        <nav className="flex flex-col items-center gap-8 pb-20 pt-8 lg:hidden">
            <Link to="/" className="text-3xl font-normal text-[#737373]">
                Home
            </Link>

            <Link to="/product" className="text-3xl font-normal text-[#737373]">
                Product
            </Link>

            <Link to="/pricing" className="text-3xl font-normal text-[#737373]">
                Pricing
            </Link>

            <Link to="/contact" className="text-3xl font-normal text-[#737373]">
                Contact
            </Link>
        </nav>
    );
}

export default MobileMenu;
