import "./App.css";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ArchivesPage from "./pages/ArchivesPage";
import ErrorPage from "./pages/ErrorPage";
import RulesDiffPage from "./pages/RulesDiffPage";
import PreviewPage from "./pages/PreviewPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { useState } from "react";
import DiffDebugPage from "./pages/DiffDebugPage";

function App() {
  const [hasError, setError] = useState(false);

  return (
    <div className="App">
      <Header onClick={() => setError(false)} />
      <ErrorBoundary hasError={hasError} onError={() => setError(true)}>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/archives" element={<ArchivesPage />} />
          <Route path="/diff/cr" element={<RulesDiffPage />} />
          <Route path="/diff/cr/:codes" element={<RulesDiffPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/debug" element={<DiffDebugPage />} />
          <Route path="/" element={<Navigate to="/diff/cr/latest" />} />
          <Route path="*" element={<ErrorPage message={"This page does not exist."} />} />
          {/* TODO doc diff routes */}
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
