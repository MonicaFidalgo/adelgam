import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBarComponent from "./components/NavBar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectParent from "./pages/ProjectParent";

function App() {
  return (
    <div>
      <Router>
        <header>
          <NavBarComponent />
        </header>
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
      </Router>
    </div>
  );
}

export default App;
