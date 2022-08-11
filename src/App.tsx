import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ArchivesPage from "./pages/ArchivesPage";
import ErrorPage from "./pages/ErrorPage";
import RulesDiffPage from "./pages/RulesDiffPage";
import PreviewPage from "./pages/PreviewPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { useState } from "react";

function App() {
  const [hasError, setError] = useState(false);

  return (
    <div className="App">
      <Header onClick={() => setError(false)} />
      <ErrorBoundary hasError={hasError} onError={() => setError(true)}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/archives" element={<ArchivesPage />} />
          <Route path="/diff/cr/:codes" element={<RulesDiffPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="*" element={<ErrorPage message={"This page does not exist."} />} />
          {/* TODO doc diff routes */}
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
