import { useState } from "react";
import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import MainLayout from "./components/MainLayout";
import LandingPage from "./pages/LandingPage";

function App() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <LanguageProvider>
      <AuthProvider>
        <ResumeProvider>
          {showLanding ? (
            <LandingPage onStart={() => setShowLanding(false)} />
          ) : (
            <MainLayout onBack={() => setShowLanding(true)} />
          )}
        </ResumeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
