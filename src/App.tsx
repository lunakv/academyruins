import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ArchivesPage from "./pages/ArchivesPage";
import ErrorPage from "./pages/ErrorPage";
import RulesDiffPage from "./pages/RulesDiffPage";
import CrPreviewPage from "./pages/CrPreviewPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { ReactNode, useState } from "react";
import CrDiffDebugPage from "./pages/CrDiffDebugPage";
import LandingPage from "./pages/LandingPage";
import MtrDiffPage from "./pages/MtrDiffPage";
import PolicyPreviewPage from "./pages/PolicyPreviewPage";
import MtrDiffDebugPage from "./pages/MtrDiffDebugPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [hasError, setError] = useState(false);

  function withHeader(children: ReactNode) {
    return (
      <>
        <Header onClick={() => setError(false)} />
        {children}
      </>
    );
  }

  const errBoundaryPage = (message: string | undefined) => withHeader(<ErrorPage message={message} />);

  return (
    <div className="App">
      <ErrorBoundary hasError={hasError} onError={() => setError(true)} errorComponent={errBoundaryPage}>
        <Routes>
          <Route path="/about" element={withHeader(<AboutPage />)} />
          <Route path="/archives" element={withHeader(<ArchivesPage />)} />
          <Route path="/diff/cr" element={withHeader(<RulesDiffPage />)} />
          <Route path="/diff/cr/:codes" element={withHeader(<RulesDiffPage />)} />
          <Route path="/diff/mtr" element={withHeader(<MtrDiffPage />)} />
          <Route path="/diff/mtr/:date" element={withHeader(<MtrDiffPage />)} />
          <Route path="/preview/cr" element={withHeader(<CrPreviewPage />)} />
          <Route path="/preview/mtr" element={withHeader(<PolicyPreviewPage />)} />
          <Route path="/debug/cr" element={withHeader(<CrDiffDebugPage />)} />
          <Route path="/debug/mtr" element={withHeader(<MtrDiffDebugPage />)} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={withHeader(<NotFoundPage />)} />
          {/* TODO IPG diff routes */}
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
