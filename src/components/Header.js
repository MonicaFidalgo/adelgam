import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import logo from "../adelgam-logo.svg";
import { Link } from "react-router-dom";
// import LanguageDropdown from "./LanguageDropdown";

const Header = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        header fixed top-0 left-0 right-0 z-40 transition-all duration-200 
        ${isScrolled ? "scrolled py-3" : "py-4"}
      `}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Brand" className="header-logo w-auto" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">{/*<LanguageDropdown />*/}</div>

            <button
              onClick={onMenuClick}
              className="header-menu p-2 rounded-lg"
              aria-label="Menu"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
