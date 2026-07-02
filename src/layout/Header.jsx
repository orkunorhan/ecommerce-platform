import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="flex w-full items-center justify-between px-6 py-6">
            <Link to="/" className="text-2xl font-bold text-slate-900">
                Bandage
            </Link>

            <nav className="flex gap-6">
                <Link to="/" className="text-sm font-semibold text-slate-600">
                    Home
                </Link>
            </nav>
        </header>
    );
}

export default Header;
