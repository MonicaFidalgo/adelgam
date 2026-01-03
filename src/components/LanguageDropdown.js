import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LANGUAGES = {
  en: "English",
  pt: "Português",
};

export default function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-100"
      >
        <Globe className="h-4 w-4" />
        {LANGUAGES[i18n.language]}
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-36 rounded-md border bg-white shadow-lg">
          {Object.entries(LANGUAGES).map(([code, label]) => (
            <button
              key={code}
              onClick={() => changeLanguage(code)}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
