import { useState, useEffect, useRef } from "react";
import Preview from "./preview/Preview";
import Editor from "./editor/Editor";
import {
  Moon,
  Sun,
  Download,
  LogIn,
  LogOut,
  User as UserIcon,
  Save,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useResume } from "../context/ResumeContext";

const MainLayout = ({ onBack }) => {
  const { user, loginWithGoogle, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { resetResume, saveResume, hasUnsavedChanges } = useResume();

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  const [sidebarWidth, setSidebarWidth] = useState(450);
  const [isResizing, setIsResizing] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar_onboarding_dismissed") !== "true";
    }
    return false;
  });
  
  const sidebarRef = useRef(null);
  const componentRef = useRef();

  const handleLogout = async () => {
    resetResume();
    await logout();
  };

  const handleSave = async () => {
    await saveResume();
  };

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("sidebar_onboarding_dismissed", "true");
  };

  const startResizing = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const stopResizing = () => setIsResizing(false);

  const resize = (e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth > 300 && newWidth < 800) {
        setSidebarWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    } else {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  // --- SOLUÇÃO PARA O PDF EM BRANCO NO MOBILE ---
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `CV_Nayeel_${new Date().toISOString().split("T")[0]}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          background: white !important;
        }
        /* Removemos o padding e as transformações do container de preview */
        .print-section {
          display: block !important;
          width: 210mm !important;
          height: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          transform: none !important;
        }
      }
    `,
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Sidebar / Editor */}
      <aside
        ref={sidebarRef}
        style={{
          width: typeof window !== "undefined" && window.innerWidth >= 768 ? `${sidebarWidth}px` : "100%",
        }}
        className="h-1/2 md:h-full flex flex-col border-r border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark shadow-material-1 z-10 overflow-hidden"
      >
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-primary text-white shadow-md">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="text-white w-5 h-5" />
              </div>
              <h1 className="text-lg font-bold tracking-tight">cvMaker</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-primary-dark/20 rounded-lg p-0.5">
              <button onClick={() => setLanguage("en")} className={`px-2 py-1 text-xs rounded-md ${language === "en" ? "bg-white text-primary font-bold" : "text-white/70"}`}>EN</button>
              <button onClick={() => setLanguage("pt")} className={`px-2 py-1 text-xs rounded-md ${language === "pt" ? "bg-white text-primary font-bold" : "text-white/70"}`}>PT</button>
            </div>

            {user ? (
              <button onClick={handleLogout} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <LogOut size={20} />
              </button>
            ) : (
              <button onClick={loginWithGoogle} className="bg-white text-primary px-3 py-1.5 rounded-full text-sm font-medium">Login</button>
            )}

            <button onClick={handleSave} className={`p-2 rounded-full ${hasUnsavedChanges ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`}>
              <Save size={20} />
            </button>

            <button onClick={handlePrint} className="p-2 rounded-full hover:bg-white/10">
              <Download size={20} />
            </button>

            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <Editor />
        </div>
      </aside>

      {/* Resize Bar */}
      <div onMouseDown={startResizing} className="hidden md:flex w-1.5 h-full cursor-col-resize hover:bg-primary/30 z-20 items-center justify-center group relative">
        <div className={`w-0.5 h-8 bg-gray-300 group-hover:bg-primary/50 transition-colors ${showOnboarding ? "animate-pulse bg-primary h-12 w-1" : ""}`}></div>
        {showOnboarding && (
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-64 bg-primary text-white p-4 rounded-2xl shadow-2xl z-50 animate-bounce-slow">
            <p className="text-sm font-medium mb-3">{t.onboardingSidebar}</p>
            <button onClick={dismissOnboarding} className="w-full bg-white text-primary py-2 rounded-xl text-sm font-bold">OK</button>
          </div>
        )}
      </div>

      {/* Preview Side */}
      <main className="flex-1 h-1/2 md:h-full bg-gray-100 dark:bg-[#1e1e1e] p-4 md:p-8 flex justify-center items-start overflow-y-auto relative">
        <div className="bg-white text-black shadow-material-3 w-[210mm] min-h-[297mm] origin-top transform scale-50 md:scale-75 lg:scale-[0.65] xl:scale-75 2xl:scale-90 p-0">
          {/* A REF ESTÁ NESTE WRAPPER ABAIXO */}
          <div ref={componentRef} className="print-section bg-white">
            <Preview />
          </div>
        </div>

        {/* Botão flutuante para mobile */}
        <button
          onClick={handlePrint}
          className="fixed bottom-6 right-6 md:hidden z-50 p-4 bg-primary text-white rounded-full shadow-2xl active:scale-90 transition-transform"
        >
          <Download size={24} />
        </button>
      </main>
    </div>
  );
};

export default MainLayout;
