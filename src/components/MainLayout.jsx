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
  const { resumeData, saveResume, hasUnsavedChanges } = useResume();

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || 
             (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  const [sidebarWidth, setSidebarWidth] = useState(450);
  const componentRef = useRef(); // Referência para a impressão real

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `CV_${resumeData.personal.firstName}_${new Date().toISOString().split("T")[0]}`,
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print {
        body { background: white !important; }
        .no-print { display: none !important; }
      }
    `,
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) { root.classList.add("dark"); localStorage.setItem("theme", "dark"); }
    else { root.classList.remove("dark"); localStorage.setItem("theme", "light"); }
  }, [darkMode]);

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* SIDEBAR - Esquerda (Sempre visível no ecrã, nunca na impressão) */}
      <aside 
        className="no-print h-1/2 md:h-full flex flex-col border-r border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark z-10"
        style={{ width: typeof window !== "undefined" && window.innerWidth >= 768 ? `${sidebarWidth}px` : "100%" }}
      >
        <header className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-primary text-white">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors"><ArrowLeft size={20} /></button>
            <h1 className="text-lg font-bold tracking-tight uppercase italic">cvMaker</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={saveResume} className={`p-2 rounded-full ${hasUnsavedChanges ? "bg-yellow-500 animate-pulse" : "bg-green-600"}`}><Save size={20} /></button>
            <button onClick={handlePrint} className="p-2 rounded-full hover:bg-white/10"><Download size={20} /></button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6"><Editor /></div>
      </aside>

      {/* ÁREA DE VISUALIZAÇÃO - Direita */}
      <main className="no-print flex-1 h-1/2 md:h-full bg-gray-100 dark:bg-[#1e1e1e] p-4 md:p-8 flex justify-center items-start overflow-y-auto relative">
        {/* A4 Visual: Esta é a "boneca" que o utilizador vê. Ela tem escala e CSS decorativo. */}
        <div className="bg-white text-black shadow-2xl w-[210mm] min-h-[297mm] origin-top transform scale-[0.45] md:scale-[0.65] lg:scale-[0.75] xl:scale-[0.85] transition-transform duration-300">
           <Preview />
        </div>

        {/* Botão Flutuante Mobile */}
        <button onClick={handlePrint} className="fixed bottom-6 right-6 md:hidden z-50 p-4 bg-primary text-white rounded-full shadow-2xl active:scale-95 transition-all">
          <Download size={24} />
        </button>
      </main>

      {/* --- RECONSTRUTOR DE IMPRESSÃO (O SEGREDO) --- */}
      {/* Este div está TOTALMENTE fora do fluxo visual. 
          Ele nunca é visto no ecrã (top-[-9999px]), 
          mas é para aqui que o react-to-print olha. */}
      <div className="absolute top-[-9999px] left-[-9999px]">
        <div ref={componentRef} className="w-[210mm] bg-white text-black">
          <Preview />
        </div>
      </div>

    </div>
  );
};

export default MainLayout;
