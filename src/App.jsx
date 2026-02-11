import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ResumeProvider>
          <MainLayout />
        </ResumeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
