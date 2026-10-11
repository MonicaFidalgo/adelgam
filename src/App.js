import { useState, useLayoutEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectParent from "./pages/ProjectParent";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import seo from "./data/seoRoutes.json";

// Lingua do documento e, por rota, titulo, descricao, canonical e robots na
// lingua escolhida. As rotas e os textos sao os mesmos que o passo pos-build
// (scripts/prerender-meta.js) escreve no HTML inicial de cada rota, em PT.
function useDocumentLanguage() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const route = seo.routes.find((r) => r.path === path);
    const prefix = route && route.key ? `meta.pages.${route.key}.` : "meta.";
    document.documentElement.lang = i18n.language === "en" ? "en" : "pt-PT";
    document.title = t(`${prefix}title`);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t(`${prefix}description`));
    if (!route) return;
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      robots.setAttribute(
        "content",
        route.noindex ? seo.robotsNoindex : seo.robots,
      );
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (route.noindex) {
      if (canonical) canonical.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", seo.siteUrl + route.path);
    }
  }, [t, i18n.language, pathname]);
}

// 🎯 NOVO: Componente que fica DENTRO do Router
function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Funcoes estaveis: o menu usa-as em efeitos (foco, scroll, Esc).
  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  useDocumentLanguage();

  return (
    <>
      <ScrollToTop />
      <Header onMenuClick={openSidebar} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/empreendimentos" exact element={<Projects />} />
        <Route path="/contactos" exact element={<Contacts />} />
        <Route path="/sobre" exact element={<About />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route
          path="/empreendimentos/:projectTitle"
          element={<ProjectParent />}
        />
        <Route
          path="/empreendimentos/:projectTitle/:projectDetailName"
          element={<ProjectDetail />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route
          path="/luxterrace-alcochete"
          element={<Navigate to="/empreendimentos/lux-terrace" replace />}
        />
        <Route
          path="/varandas-montijo"
          element={
            <Navigate to="/empreendimentos/varandas-do-montijo" replace />
          }
        />
        <Route
          path="/lux-terrace-apartamento-t2"
          element={
            <Navigate to="/empreendimentos/lux-terrace/apartment-t2" replace />
          }
        />
        <Route
          path="/moradias-de-sao-francisco"
          element={<Navigate to="/empreendimentos/moradias" replace />}
        />
      </Routes>
      <Footer />
    </>
  );
}

// 🎯 App principal só tem o Router
function App() {
  return (
    <div>
      <Router>
        <AppContent /> {/* ← Tudo dentro deste componente */}
      </Router>
    </div>
  );
}

export default App;
