import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider } from "./context/AuthContext";
import AdminPanel from "./pages/AdminPanel";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./components/MainLayout";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import UnsupportedScreen, { useIsDesktop } from "./components/UnsupportedScreen";

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
            <Routes>
              <Route path="/" element={<LandingPageWrapper />} />
              <Route path="/app" element={<MainLayoutWrapper />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </ResumeProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
