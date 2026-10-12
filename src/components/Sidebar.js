import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X, Phone, Mail, ArrowUpRight } from "lucide-react";
import logo from "../adelgam-logo.svg";
import { PORTAS_DO_TEJO_URL, PENTHOUSE_URL, linkNaLingua } from "../data/externalLinks";

// Menu do site (o mesmo em todos os tamanhos de ecra): painel creme que entra
// pela direita, com logotipo, links, atalhos para os empreendimentos a venda,
// lingua e contactos. Dialogo modal: Esc e tocar fora fecham, o foco fica
// preso no painel e volta ao botao que o abriu, a pagina por baixo nao faz
// scroll enquanto esta aberto.

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

const isActive = (pathname, to) =>
  to === "/" ? pathname === "/" : pathname.startsWith(to);

export default function Sidebar({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const openerRef = useRef(null);
  const lastPath = useRef(pathname);

  // Mudou de pagina (link do menu, voltar atras...): fecha.
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      if (isOpen) onClose();
    }
  }, [pathname, isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    openerRef.current = document.activeElement;
    const html = document.documentElement;
    const previous = {
      body: document.body.style.overflow,
      html: html.style.overflow,
    };
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const inside = panelRef.current.contains(document.activeElement);
      if (e.shiftKey && (document.activeElement === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous.body;
      html.style.overflow = previous.html;
      const opener = openerRef.current;
      if (opener && typeof opener.focus === "function" && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, [isOpen, onClose]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("language", lng);
    } catch (e) {
      // sem localStorage: a lingua muda so nesta visita
    }
  };

  const menuItems = [
    { label: t("menu.home"), to: "/" },
    { label: t("menu.projects"), to: "/empreendimentos", shortcuts: true },
    { label: t("menu.about"), to: "/sobre" },
    { label: t("menu.contact"), to: "/contactos" },
  ];

  const lang = i18n.language === "en" ? "en" : "pt";

  return (
    <div className={`site-menu ${isOpen ? "is-open" : ""}`}>
      <div
        className="site-menu-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id="site-menu"
        ref={panelRef}
        className="site-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label={t("menu.label")}
        aria-hidden={!isOpen}
      >
        <div className="site-menu-top">
          <Link to="/" onClick={onClose} className="site-menu-logo">
            <img src={logo} alt="Adelgam" />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="site-menu-close"
            aria-label={t("menu.close")}
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <nav className="site-menu-nav" aria-label={t("menu.label")}>
          <ul>
            {menuItems.map((item) => {
              const active = isActive(pathname, item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className={`site-menu-link ${active ? "is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                  {item.shortcuts && (
                    <ul className="site-menu-sub">
                      <li>
                        <a href={linkNaLingua(PORTAS_DO_TEJO_URL, i18n.language)}>
                          Portas do Tejo
                          <ArrowUpRight aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href={linkNaLingua(PENTHOUSE_URL, i18n.language)}>
                          Penthouse Lux Terrace
                          <ArrowUpRight aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className="site-menu-lang"
          role="group"
          aria-label={t("menu.language")}
        >
          {["pt", "en"].map((code) => (
            <button
              key={code}
              type="button"
              lang={code}
              onClick={() => changeLanguage(code)}
              aria-pressed={lang === code}
              className={lang === code ? "is-active" : ""}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="site-menu-contacts">
          <a href="tel:+351913815379">
            <Phone aria-hidden="true" />
            +351 913 815 379
          </a>
          <a href="mailto:adelgam@adelgam.pt">
            <Mail aria-hidden="true" />
            adelgam@adelgam.pt
          </a>
          <Link
            to="/contactos"
            onClick={onClose}
            className="button button-primary site-menu-cta"
          >
            {t("menu.contact")}
          </Link>
        </div>
      </div>
    </div>
  );
}
