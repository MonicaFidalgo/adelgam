import { X } from "lucide-react";
import { Link } from "react-router-dom";
// import { useTranslation } from "../contexts/TranslationContext";

export default function Sidebar({ isOpen, onClose }) {
  // const { t } = useTranslation();

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Empreendimentos", to: "/empreendimentos" },
    { label: "A Adelgam", to: "/sobre" },
    { label: "Contacte-nos", to: "/contactos" },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full bg-black z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full md:w-1/2`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-8 md:px-16">
            <ul className="space-y-8">
              {menuItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="text-white text-3xl md:text-4xl font-light hover:text-gray-300 transition-colors block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
