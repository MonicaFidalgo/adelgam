import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import logo from "../adelgam-logo.svg";
import { Link } from "react-router-dom";
// import { useTranslation } from "../contexts/TranslationContext";

const Header = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  // const { language, setLanguage } = useTranslation();
  // const [showLangDropdown, setShowLangDropdown] = useState(false);
  //  max-w-7xl

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
        header fixed top-0 left-0 right-0 z-40 transition-all duration-300 
        ${isScrolled ? "scrolled" : ""}
      `}
    >
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Brand" className="header-logo w-auto" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              {/* <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium uppercase">
                  {language}
                </span>
              </button> */}

              {/* {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setShowLangDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("pt");
                      setShowLangDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                  >
                    Português
                  </button>
                </div>
              )} */}
            </div>

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
