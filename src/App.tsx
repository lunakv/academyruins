import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ArchivesPage from "./pages/ArchivesPage";
import ErrorPage from "./pages/ErrorPage";
import RulesDiffPage from "./pages/RulesDiffPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/archives" element={<ArchivesPage />} />
        <Route path="/diff/cr" element={<RulesDiffPage />} />
        <Route
          path="*"
          element={<ErrorPage message={"This page does not exist."} />}
        />
        {/* TODO doc diff routes */}
      </Routes>
    </div>
  );
}

export default App;
