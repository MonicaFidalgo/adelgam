import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBarComponent from "./components/NavBar";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Router>
        <header>
          <NavBarComponent />
        </header>
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
