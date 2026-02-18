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

  const handleLogout = async () => {
    resetResume();
    await logout();
  };

  const handleSave = async () => {
    await saveResume();
  };

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

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("sidebar_onboarding_dismissed", "true");
  };

  const startResizing = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

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

  const componentRef = useRef();

  // --- CONFIGURAÇÃO DE IMPRESSÃO CORRIGIDA (SIMPLIFICADA) ---
const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `CV_Nayeel_${new Date().toISOString().split("T")[0]}`,
    onAfterPrint: () => console.log("Impressão terminada"),
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        /* Reset total ao corpo da página de impressão */
        html, body {
          height: auto !important;
          min-height: 100% !important;
          overflow: visible !important;
          margin: 0 !important;
          padding: 0 !important;
          background-color: white !important;
        }

        /* Garante que o container do CV ocupa o espaço todo e é visível */
        #printable-content {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 210mm !important;
          min-height: 297mm !important;
          height: auto !important; /* IMPORTANTE: Permite crescer */
          margin: 0 auto !important;
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          background-color: white !important;
          color: black !important;
          z-index: 9999;
        }

        /* Esconde qualquer scrollbar ou elemento estranho */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
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
    <div className="flex h-screen flex-col md:flex-row overflow-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-300 print:hidden">
      {/* Editor Side (Left) */}
      <aside
        ref={sidebarRef}
        style={{
          width:
            typeof window !== "undefined" && window.innerWidth >= 768
              ? `${sidebarWidth}px`
              : "100%",
        }}
        className="h-1/2 md:h-full flex flex-col border-r border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark shadow-material-1 z-10 overflow-hidden"
      >
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-primary text-white shadow-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 group"
              title={t.back}
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div className="flex items-center gap-2 ml-1">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shadow-inner">
                <FileText className="text-white w-5 h-5" />
              </div>
              <h1 className="text-lg font-bold tracking-tight">
                cv<span className="opacity-80 font-medium">Maker</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-primary-dark/20 rounded-lg p-0.5 mr-2">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  language === "en"
                    ? "bg-white text-primary font-bold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                EN
              </button>
              <div className="w-[1px] h-3 bg-white/20"></div>
              <button
                onClick={() => setLanguage("pt")}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  language === "pt"
                    ? "bg-white text-primary font-bold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                PT
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-2 mr-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    title={user.displayName}
                  />
                ) : (
                  <UserIcon size={20} />
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  title={t.logout}
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="flex items-center gap-1 text-sm bg-white text-primary px-3 py-1.5 rounded-full font-medium hover:bg-gray-100 transition-colors mr-2"
              >
                <LogIn size={16} /> {t.login}
              </button>
            )}

            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-medium transition-all mr-2 ${
                hasUnsavedChanges
                  ? "bg-yellow-500 text-white hover:bg-yellow-600 animate-pulse"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
              title={hasUnsavedChanges ? t.unsavedChanges : t.saved}
            >
              <Save size={16} />
              <span className="text-sm">
                {hasUnsavedChanges ? t.save : t.saved}
              </span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
              aria-label={t.download}
              title={t.download}
            >
              <Download size={20} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={darkMode ? t.lightMode : t.darkMode}
              title={darkMode ? t.lightMode : t.darkMode}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          <Editor />
        </div>
      </aside>

      {/* Resize Handle */}
      <div
        onMouseDown={startResizing}
        className={`hidden md:flex w-1.5 h-full cursor-col-resize hover:bg-primary/30 transition-colors z-20 items-center justify-center group relative ${
          isResizing ? "bg-primary/40" : "bg-transparent"
        }`}
      >
        <div
          className={`w-0.5 h-8 bg-gray-300 dark:bg-gray-600 rounded-full group-hover:bg-primary/50 transition-colors ${
            showOnboarding ? "animate-pulse bg-primary h-12 w-1" : ""
          }`}
        ></div>

        {showOnboarding && (
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-64 bg-primary text-white p-4 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in duration-300">
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rotate-45"></div>
            <p className="text-sm font-medium mb-3 leading-relaxed">
              {t.onboardingSidebar}
            </p>
            <button
              onClick={dismissOnboarding}
              className="w-full bg-white text-primary py-2 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              {t.onboardingOk}
            </button>
          </div>
        )}
      </div>

      {/* Preview Side (Right) */}
      <main className="flex-1 h-1/2 md:h-full bg-gray-100 dark:bg-[#1e1e1e] p-4 md:p-8 flex justify-center items-start overflow-y-auto relative">
        
        {/* Wrapper visual do papel A4 na tela (com sombras e escala) */}
        <div className="bg-white text-black shadow-material-3 w-[210mm] min-h-[297mm] origin-top transform scale-50 md:scale-75 lg:scale-[0.65] xl:scale-75 2xl:scale-90 transition-transform duration-300 p-0">
          
          {/* IMPORTANTE: Este é o elemento que o 'componentRef' vai agarrar.
             Adicionei id="printable-content" para ligar ao CSS acima.
             Atenção: NÃO coloques classes como 'h-full' ou 'absolute' aqui.
          */}
          <div ref={componentRef} id="printable-content">
            <Preview />
          </div>

        </div>

        {/* Botão Flutuante Mobile */}
        <button
          onClick={handlePrint}
          className="fixed bottom-6 right-6 md:hidden z-50 p-4 bg-primary text-white rounded-full shadow-material-3 hover:bg-primary-dark transition-colors"
        >
          <Download size={24} />
        </button>
      </main>
    </div>
  );
};

export default MainLayout;
