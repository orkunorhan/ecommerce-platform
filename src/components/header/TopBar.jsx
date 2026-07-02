import { Mail, Phone } from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";

function TopBar() {
    return (
        <div className="hidden h-[46px] items-center justify-between bg-[#252B42] px-8 text-white lg:flex">
            <div className="flex items-center gap-[30px]">
                <div className="flex items-center gap-[5px] text-sm font-bold leading-6">
                    <Phone size={16} strokeWidth={2.5} />
                    <span>(225) 555-0118</span>
                </div>

                <div className="flex items-center gap-[5px] text-sm font-bold leading-6">
                    <Mail size={16} strokeWidth={2.5} />
                    <span>michelle.rivera@example.com</span>
                </div>
            </div>

            <p className="text-sm font-bold leading-6">
                Follow Us and get a chance to win 80% off
            </p>

            <div className="flex items-center gap-[10px]">
                <span className="text-sm font-bold leading-6">Follow Us :</span>
                <FaInstagram size={16} />
                <FaYoutube size={16} />
                <FaFacebookF size={14} />
                <FaTwitter size={16} />
            </div>
        </div>
    );
}

export default TopBar;
