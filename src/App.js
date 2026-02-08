import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectParent from "./pages/ProjectParent";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import usePageTracking from "./hooks/usePageTracking";

// 🎯 NOVO: Componente que fica DENTRO do Router
function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  usePageTracking(); // ✅ Agora está dentro do Router!

  return (
    <>
      <ScrollToTop />
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/empreendimentos" exact element={<Projects />} />
        <Route path="/contactos" exact element={<Contacts />} />
        <Route path="/sobre" exact element={<About />} />
        <Route
          path="/empreendimentos/:projectTitle"
          element={<ProjectParent />}
        />
        <Route
          path="/empreendimentos/:projectTitle/:projectDetailName"
          element={<ProjectDetail />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
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
