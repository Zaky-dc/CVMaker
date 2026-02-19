import { lazy, Suspense } from "react";
import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UnsupportedScreen, { useIsDesktop } from "./components/UnsupportedScreen";
import LoadingScreen from "./components/ui/LoadingScreen";

// Lazy load heavy components to speed up initial landing page load
const MainLayout = lazy(() => import("./components/MainLayout"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

const LandingPageWrapper = () => {
  const navigate = useNavigate();
  return <LandingPage onStart={() => navigate('/app')} />;
};

const MainLayoutWrapper = () => {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  if (!isDesktop) return <UnsupportedScreen />;
  return <MainLayout onBack={() => navigate('/')} />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <ResumeProvider>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<LandingPageWrapper />} />
                <Route path="/app" element={<MainLayoutWrapper />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </Suspense>
          </ResumeProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
