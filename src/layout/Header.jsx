import Navbar from "../components/header/Navbar";
import TopBar from "../components/header/TopBar";

function Header() {
    return (
        <header className="flex w-full flex-col bg-white">
            <TopBar />
            <Navbar />
        </header>
    );
}

export default Header;
