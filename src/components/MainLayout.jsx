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
  const { saveResume, hasUnsavedChanges } = useResume();

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
  const sidebarRef = useRef(null);
  const componentRef = useRef(); // A REF que vai capturar o CV

  const startResizing = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const stopResizing = () => setIsResizing(false);

  const resize = (e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth > 300 && newWidth < 800) setSidebarWidth(newWidth);
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

  // --- MÁGICA DA IMPRESSÃO CORRIGIDA ---
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Resume_${new Date().toISOString().split("T")[0]}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        /* Esconde TUDO da interface do site */
        body * {
          visibility: hidden;
        }
        /* Torna apenas o currículo visível */
        .printable-area, .printable-area * {
          visibility: visible !important;
        }
        /* Posiciona o currículo no topo absoluto para o PDF não sair em branco */
        .printable-area {
          position: fixed !important;
          left: 0 !important;
          top: 0 !important;
          width: 210mm !important;
          height: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          transform: none !important; /* Anula o scale do mobile */
          background-color: white !important;
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
    <div className="flex h-screen flex-col md:flex-row overflow-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* SIDEBAR / EDITOR */}
      <aside
        ref={sidebarRef}
        style={{
          width: typeof window !== "undefined" && window.innerWidth >= 768 ? `${sidebarWidth}px` : "100%",
        }}
        className="h-1/2 md:h-full flex flex-col border-r border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark shadow-lg z-10 overflow-hidden"
      >
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-primary text-white shadow-md flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="text-white w-5 h-5" />
              </div>
              <h1 className="text-lg font-bold tracking-tight uppercase tracking-widest">cvMaker</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Seletor de Idiomas Restaurado */}
            <div className="flex items-center bg-primary-dark/20 rounded-lg p-0.5 mr-1">
              <button onClick={() => setLanguage("en")} className={`px-2 py-1 text-[10px] font-bold rounded-md ${language === "en" ? "bg-white text-primary" : "text-white/70"}`}>EN</button>
              <button onClick={() => setLanguage("pt")} className={`px-2 py-1 text-[10px] font-bold rounded-md ${language === "pt" ? "bg-white text-primary" : "text-white/70"}`}>PT</button>
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-white/50" />
                <button onClick={logout} className="p-2 hover:bg-white/10 rounded-full"><LogOut size={18} /></button>
              </div>
            ) : (
              <button onClick={loginWithGoogle} className="p-2 hover:bg-white/10 rounded-full"><LogIn size={18} /></button>
            )}

            <button onClick={saveResume} className={`p-2 rounded-full ${hasUnsavedChanges ? "bg-yellow-500 animate-pulse" : "bg-green-600"}`}>
              <Save size={18} className="text-white" />
            </button>

            <button onClick={handlePrint} className="p-2 hover:bg-white/10 rounded-full">
              <Download size={18} />
            </button>

            <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:bg-white/10 rounded-full">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          <Editor />
        </div>
      </aside>

      {/* RESIZE BAR */}
      <div onMouseDown={startResizing} className="hidden md:flex w-1 h-full cursor-col-resize hover:bg-primary/50 transition-colors z-20"></div>

      {/* PREVIEW SIDE */}
      <main className="flex-1 h-1/2 md:h-full bg-gray-100 dark:bg-[#1e1e1e] p-4 md:p-8 flex justify-center items-start overflow-y-auto relative">
        <div className="bg-white text-black shadow-2xl w-[210mm] min-h-[297mm] origin-top transform scale-[0.45] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.75] xl:scale-[0.85] transition-transform duration-300">
          
          {/* AQUI ESTÁ O TRUQUE: O div da REF tem a classe 'printable-area' */}
          <div ref={componentRef} className="printable-area w-full h-full bg-white">
            <Preview />
          </div>

        </div>

        {/* Botão flutuante mobile */}
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
