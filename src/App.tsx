import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ArchivesPage from "./pages/ArchivesPage";
import ErrorPage from "./pages/ErrorPage";
import RulesDiffPage from "./pages/RulesDiffPage";
import PreviewPage from "./pages/PreviewPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { ReactNode, useState } from "react";
import DiffDebugPage from "./pages/DiffDebugPage";
import LandingPage from "./pages/LandingPage";
import MtrDiffPage from "./pages/MtrDiffPage";

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
          <Route path="/preview" element={withHeader(<PreviewPage />)} />
          <Route path="/debug" element={withHeader(<DiffDebugPage />)} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={withHeader(<ErrorPage message={"This page does not exist."} />)} />
          {/* TODO doc diff routes */}
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
